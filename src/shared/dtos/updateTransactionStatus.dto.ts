import { TransactionPaymentType } from '../enums/Transaction.enum';
import { WebhookEventTypeEnum } from '../enums/Webhook.enum';
import { ValidationError } from '../errors/Validation.error';
import { BaseDTOValidator } from '../interfaces/base.dto'
import { validate as validateUUID } from "uuid";

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
    cartId?: string;
    subscriptionIds: string[];
  }

  constructor(
    body: Record<string, any>
  ) {
    this.event = body?.event;
    this.transactionId = body?.transactionId;
    this.orderId = body?.orderId;
    this.customerId = body?.customerId;
    this.amount = body?.amount;
    this.currency = body?.currency;
    this.paymentMethod = body?.paymentMethod;
    this.timestamp = body?.timestamp;
    this.metadata = body?.metadata;
  }

  validate() {
    if (!this.event) {
      throw new ValidationError(
        'event is Required on transaction update status'
      )
    }

    if (!this.transactionId|| !validateUUID(this.transactionId)) {
      throw new ValidationError(
        'transactionId is Required and must be an UUID on transaction update status'
      )
    }

    if (!this.customerId|| !validateUUID(this.customerId)) {
      throw new ValidationError(
        'customerId is Required and must be an UUID on transaction update status'
      )
    }

    if (!this.orderId|| !validateUUID(this.orderId)) {
      throw new ValidationError(
        'orderId is Required and must be an UUID on transaction update status'
      )
    }

    if (!this.amount) {
      throw new ValidationError(
        'amount is Required on transaction update status'
      )
    }

    if (!this.metadata?.subscriptionIds
        || !Array.isArray(this.metadata.subscriptionIds)
        || this.metadata.subscriptionIds.some(id => !validateUUID(id)))
      {
      throw new ValidationError(
        'subscriptionIds is Required and must be an array of UUIDs on transaction update status'
      )
    }

    if (this.metadata?.cartId && !validateUUID(this.metadata.cartId)) {
      throw new ValidationError(
        'cartId must be an UUID on transaction update status'
      )
    }
  }
}

