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
import { SubscriptionEntity } from "../entities/Subscription.entity";
import { SubscriptionStatus } from "src/shared/enums/Subscription.enum";

export class WebhookRepository {

  constructor(private readonly database: DataSource) {}

  async updateTransactionStatus(data: UpdateTransactionStatusDTO) {
    console.log('Received a webhook', JSON.stringify(data));

    const hash = getHash(JSON.stringify(data));

    await this.validateEvent(hash);

    const transaction = await this.getTransaction(data, hash);

    console.log('Transaction found');

    if (data.event === WebhookEventTypeEnum.PENDING) {
      console.log('Processing pending type event');
      return this.saveEvent(data, hash)
    }

    if (data.event === WebhookEventTypeEnum.FAILED ) {
      console.log('Processing failed type event');
      return await this.database.transaction(async (manager) => {
          if (data.metadata.cartId) {
            console.log('Reopening Cart');
            await manager.update(CartEntity, data.metadata.cartId, { status: CartStatus.OPEN, updatedAt: new Date() })
          }

          console.log('Updating subscription status');
          for (const subscription of data.metadata.subscriptionIds) {
            await manager.update(SubscriptionEntity, subscription, {status: SubscriptionStatus.PAST_DUE})
          }

          await manager.save(ProcessedEventEntity, {hash, eventType: data.event, transactionId: data.transactionId})
        })
    }

    console.log('Processing success type event');
    await this.database.transaction(async (manager) => {
      for (const subscriptionId of data.metadata.subscriptionIds) {
        const subscription = await manager.findOne(SubscriptionEntity, {where: {id: subscriptionId}})

        if (!subscription) {
          throw new HttpError(422, `Subscription with ID ${subscriptionId} not found`)
        }

        const now = new Date()

        const endDate = getEndDate(now, subscription.periodicity);

        console.log('Updating subscription status');
        await manager.update(SubscriptionEntity, subscription.id, {status: SubscriptionStatus.ACTIVE})

        console.log('Creating a new period');
        await manager.save(PeriodEntity, {transactionId: transaction.id, startDate: now, endDate, subscriptionId: subscription.id})
      }

      await manager.save(ProcessedEventEntity, {hash, eventType: data.event, transactionId: data.transactionId})
    })
  }

  private async getTransaction(data: UpdateTransactionStatusDTO, hash: string) {
    const transaction = await this.database.getRepository(TransactionEntity).findOne({
      where: {id: data.transactionId},
      relations: {
        order: true
      }
    })

    if (!transaction) {
      await this.saveEvent(data, hash);
      throw new HttpError(422, 'Transaction not found')
    }

    if (transaction.status !== TransactionStatus.PENDING) {
      await this.saveEvent(data, hash);
      throw new HttpError(422, 'Transaction not in pending status')
    }

    return transaction;
  }

  private async saveEvent(data: UpdateTransactionStatusDTO, hash: string) {
    await this.database.getRepository(ProcessedEventEntity).save({hash, eventType: data.event, transactionId: data.transactionId})
  }

  private async validateEvent(hash: string) {
    const event = await this.database.getRepository(ProcessedEventEntity).findOneBy({hash: hash})

    if (event) {
      throw new HttpError(422, 'Event already processed') 
    }
  }
}

export default new WebhookRepository(TypeormDataSource)