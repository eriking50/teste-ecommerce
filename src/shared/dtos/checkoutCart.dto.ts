import { TransactionPaymentType, TransactionStatus } from '../enums/Transaction.enum';
import { ValidationError } from '../errors/Validation.error';
import { BaseDTOValidator } from '../interfaces/base.dto'

export class CheckoutCartDTO implements BaseDTOValidator {
	public paymentType: TransactionPaymentType
  public cardSimulation?: TransactionStatus

	constructor(
		body: Record<string, any>
	) {
		this.paymentType = body?.paymentType;
    this.cardSimulation = body?.cardSimulation;
	}

	validate() {
    const paymentTypes = Object.values(TransactionPaymentType);

		if (!this.paymentType || !paymentTypes.includes(this.paymentType)) {
			throw new ValidationError(
					'paymentType is Required and must be "card", "pix" or "boleto" on cart checkout'
			)
		}

    const transactionStatus = Object.values(TransactionStatus)

    if(this.paymentType === TransactionPaymentType.CARD && this.cardSimulation && !transactionStatus.includes(this.cardSimulation)) {
      throw new ValidationError(
					'cardSimulation and must be "success", "pending" or "failure"'
			)
    }
	}
}

