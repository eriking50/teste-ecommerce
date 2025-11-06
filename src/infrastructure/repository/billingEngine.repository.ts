import { DataSource } from "typeorm";
import TypeormDataSource from "./DataSource";
import { HttpError } from "src/shared/errors/Base.error";
import { SubscriptionEntity } from "../entities/Subscription.entity";
import { TransactionEntity } from "../entities/Transaction.entity";
import { OrderEntity } from "../entities/Order.entity";
import { TransactionPaymentType, TransactionStatus } from "src/shared/enums/Transaction.enum";
import { ProductEntity } from "../entities/Product.entity";

export class BillingEngineRepository {

  constructor(private readonly database: DataSource) {}

  async getEndingSubscriptions(subscriptionId: string) {
    const subscription = await this.database.getRepository(SubscriptionEntity).findOneBy({id: subscriptionId})

    if (!subscription) {
      throw new HttpError(422, 'Subscription not found')
    }

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

export default new BillingEngineRepository(TypeormDataSource)