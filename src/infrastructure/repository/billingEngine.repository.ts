import { DataSource, LessThan } from "typeorm";
import TypeormDataSource from "./DataSource";
import { HttpError } from "src/shared/errors/Base.error";
import { SubscriptionEntity } from "../entities/Subscription.entity";
import { TransactionEntity } from "../entities/Transaction.entity";
import { OrderEntity } from "../entities/Order.entity";
import { TransactionPaymentType, TransactionStatus } from "src/shared/enums/Transaction.enum";
import { ProductEntity } from "../entities/Product.entity";
import { SubscriptionStatus } from "src/shared/enums/Subscription.enum";

export class BillingEngineRepository {

  constructor(private readonly database: DataSource) {}

  async execute() {
    const maxEndDate = this.getMaxEndDate()

    const subscriptions = await this.database.getRepository(SubscriptionEntity).find({
      where: {status: SubscriptionStatus.ACTIVE},
      relations:{ periods: true },
      order: { periods: { createdAt: "DESC" }}
    })

    const filteredSubscriptions = subscriptions.filter(sub => sub.periods?.[0].endDate < maxEndDate)

    if (!filteredSubscriptions.length) {
      console.log('No subscriptions are ending in this period')
      return;
    }

    for (const subscription of subscriptions) {
      console.log(`Creating order and transaction for subscription: ${subscription.id}`)
      const product = await this.database.getRepository(ProductEntity).findOneBy({id: subscription.productId}) 
  
      if (!product) {
        throw new HttpError(422, 'Product not found')
      }
  
      await this.database.transaction(async (manager) => {
        const order = await manager.save(OrderEntity, { customerId: subscription.customerId })
  
        await manager.save(TransactionEntity, {order, status: TransactionStatus.PENDING, paymentType: TransactionPaymentType.CARD, totalValue: product.price})
      })
    }
  }
  private getMaxEndDate() {
    const maxNumberOfDays = Number(process.env.MAX_SUBSCRIPTION_ENDING_DAYS)

    const date = new Date()
    date.setDate(date.getDate() + maxNumberOfDays)
    return date;
  }
}

export default new BillingEngineRepository(TypeormDataSource)