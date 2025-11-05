import { TransactionPaymentType } from '../enums/Transaction.enum';
import { WebhookEventTypeEnum } from '../enums/Webhook.enum';
import { ValidationError } from '../errors/Validation.error';
import { BaseDTOValidator } from '../interfaces/base.dto'

export class UpdateTransactionStatusDTO implements BaseDTOValidator {
  public event: WebhookEventTypeEnum;
  public transactionId: string;
  public orderId: string;
  public customerId: string;
  public amount: number;
  public currency: string;
  public paymentMethod: TransactionPaymentType;
  public timestamp: string;
  public metadata: {
    cartId: string;
    subscriptionId: string;
  }

  constructor(
    body: Record<string, any>
  ) {
    this.event = body?.event;
    this.transactionId = body?.transactionId;
  }

  validate() {
    if (!this.event) {
      throw new ValidationError(
        'event is Required on transaction update status'
      )
    }

    if (!this.transactionId) {
      throw new ValidationError(
        'transactionId is Required on transaction update status'
      )
    }

    if (!this.customerId) {
      throw new ValidationError(
        'customerId is Required on transaction update status'
      )
    }

    if (!this.orderId) {
      throw new ValidationError(
        'orderId is Required on transaction update status'
      )
    }

    if (!this.amount) {
      throw new ValidationError(
        'amount is Required on transaction update status'
      )
    }

    if (!this.metadata?.cartId) {
      throw new ValidationError(
        'cartId is Required on transaction update status'
      )
    }

    if (!this.metadata?.subscriptionId) {
      throw new ValidationError(
        'subscriptionId is Required on transaction update status'
      )
    }
  }
}

