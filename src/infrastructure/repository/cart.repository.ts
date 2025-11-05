import { DataSource, EntityManager, In } from "typeorm";
import TypeormDataSource from "./DataSource";
import { CartEntity } from "../entities/Cart.entity";
import { CustomerEntity } from "../entities/Customer.entity";
import { OpenCartDTO } from "src/shared/dtos/openCart.dto";
import { CartStatus } from "src/shared/enums/Cart.enum";
import { HttpError } from "src/shared/errors/Base.error";
import { CheckoutCartDTO } from "src/shared/dtos/checkoutCart.dto";
import { OrderEntity } from "../entities/Order.entity";
import { TransactionEntity } from "../entities/Transaction.entity";
import { TransactionPaymentType, TransactionStatus } from "src/shared/enums/Transaction.enum";
import { CartItemType } from "src/shared/enums/CartItem.enum";
import { SubscriptionEntity } from "../entities/Subscription.entity";
import { SubscriptionStatus } from "src/shared/enums/Subscription.enum";
import { PeriodEntity } from "../entities/Period.entity";
import { getEndDate } from "src/shared/utils/date.util";

export class CartRepository {

  constructor(private readonly database: DataSource) {}

  async create(data: OpenCartDTO) {
    const customer = await this.database.getRepository(CustomerEntity).findOneBy({id: data.customerId})

    if (!customer) {
      throw new HttpError(422, 'Customer not found')
    }

    return await this.database.getRepository(CartEntity).save({ customerId: customer.id, status: CartStatus.OPEN })
  }

  async findByCustomerId(data: OpenCartDTO) {
    return await this.database.getRepository(CartEntity).findOne({where: {
      status: CartStatus.OPEN,
      customer: {id: data.customerId }
    }})
  }

  async checkout(cartId: string, data: CheckoutCartDTO) {
    const cart = await this.database.getRepository(CartEntity).findOne({where: {id: cartId, status: CartStatus.OPEN}, relations: {items: true}})

    if (!cart) {
      throw new HttpError(422, 'Cart not found')
    }

    const alreadySubscribed = await this.database.getRepository(SubscriptionEntity).find({where: {
      productId: In(cart.items
        .filter(item => item.type === CartItemType.SUBSCRIPTION)
        .map(item => item.productId)),
      customerId: cart.customerId
    }})

    if (alreadySubscribed.length) {
      throw new HttpError(422, `Customer is alredy subscribed to products ${alreadySubscribed.map(subscription => subscription.productId).join(', ')}`)
    }

    return await this.database.transaction(async (manager) => {
      const isSimulation = data.paymentType === TransactionPaymentType.CARD && data.cardSimulation

      const order = await manager.save(OrderEntity, {customerId: cart.customerId, cartId: cart.id })

      const totalValue = cart.items.reduce((acc, actual) => acc + (actual.price * actual.quantity), 0)

      const status = isSimulation ? data.cardSimulation : TransactionStatus.PENDING;

      const transaction = await manager.save(TransactionEntity,
        { totalValue, order, paymentType: data.paymentType, status})

      const subscriptions = await Promise.all(cart.items
      .filter(item => item.type === CartItemType.SUBSCRIPTION)
      .map((item) => {
        const now = new Date()

        const nextBillingDate = getEndDate(now, item.periodicity);

        return manager.save(SubscriptionEntity, {
          order,
          productId: item.productId,
          customerId: cart.customerId,
          periodicity: item.periodicity,
          status: SubscriptionStatus.ACTIVE,
          nextBillingDate,
        })
      }))

      if (status === TransactionStatus.SUCCESS) {
        await this.simulateSuccess(cart, subscriptions, transaction, manager)
      }

      return {
        status,
        paymentType: data.paymentType,
        orderId: order.id,
        transactionId: transaction.id,
        subscriptionIds: subscriptions.map(subscription => subscription.id),
      }
    })
  }

  async simulateSuccess(cart: CartEntity, subscriptions: SubscriptionEntity[], transaction: TransactionEntity, manager: EntityManager) {
    await Promise.all(subscriptions.map((subscription) => {
      const now = new Date()

      const endDate = getEndDate(now, subscription.periodicity);

      return manager.save(PeriodEntity, 
        {transactionId: transaction.id, startDate: now, endDate, subscriptionId: subscription.id}
      )
    }))

    await manager.update(CartEntity, cart.id, { status: CartStatus.CLOSED, updatedAt: new Date() })
  }
}

export default new CartRepository(TypeormDataSource)