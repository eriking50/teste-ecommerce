import { DataSource } from "typeorm";
import TypeormDataSource from "./DataSource";
import { HttpError } from "src/shared/errors/Base.error";
import { TransactionEntity } from "../entities/Transaction.entity";
import { UpdateTransactionStatusDTO } from "src/shared/dtos/updateTransactionStatus.dto";
import { TransactionStatus } from "src/shared/enums/Transaction.enum";
import { WebhookEventTypeEnum } from "src/shared/enums/Webhook.enum";
import { getHash } from "src/shared/utils/crypto.util";
import { ProcessedEventEntity } from "../entities/ProcessedEvent.entity";
import { CartStatus } from "src/shared/enums/Cart.enum";
import { CartEntity } from "../entities/Cart.entity";
import { PeriodEntity } from "../entities/Period.entity";
import { getEndDate } from "src/shared/utils/date.util";

export class WebhookRepository {

  constructor(private readonly database: DataSource) {}

  async updateTransactionStatus(data: UpdateTransactionStatusDTO) {
    console.log('Received a webhook', JSON.stringify(data));

    const hash = getHash(JSON.stringify(data));

    await this.validateEvent(hash);

    const transaction = await this.getTransaction(data);

    console.log('Transaction found');

    if (data.event !== WebhookEventTypeEnum.SUCCESS) {
      return;
    }

    await this.database.transaction(async (manager) => {

    await Promise.all(transaction.order.subscriptions.map((subscription) => {
      const now = new Date()

      const endDate = getEndDate(now, subscription.periodicity);

      return manager.save(PeriodEntity, 
        {transactionId: transaction.id, startDate: now, endDate, subscriptionId: subscription.id})
      }))

      await manager.update(CartEntity, data.metadata.cartId, { status: CartStatus.CLOSED, updatedAt: new Date() })

      await manager.save(ProcessedEventEntity, {hash, eventType: data.event, transactionId: data.transactionId})
    })
  }

  private async getTransaction(data: UpdateTransactionStatusDTO) {
    const transaction = await this.database.getRepository(TransactionEntity).findOne({
      where: {id: data.customerId},
      relations: {
        order: {subscriptions: true}
      }
    })

    if (!transaction) {
      throw new HttpError(422, 'Transaction not found')
    }

    if (transaction.status !== TransactionStatus.PENDING) {
      throw new HttpError(422, 'Transaction not in pending status')
    }

    return transaction;
  }

  private async validateEvent(hash: string) {
    const event = await this.database.getRepository(ProcessedEventEntity).findOneBy({hash: hash})

    if (event) {
      throw new HttpError(422, 'Event already processed') 
    }
  }
}

export default new WebhookRepository(TypeormDataSource)