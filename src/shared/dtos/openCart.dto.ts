import { ValidationError } from '../errors/Validation.error';
import { BaseDTOValidator } from '../interfaces/base.dto'

export class OpenCartDTO implements BaseDTOValidator {
	public customerId: string

	constructor(
		body: Record<string, any>
	) {
		this.customerId = body?.customerId;
	}

	validate() {
		if (!this.customerId) {
			throw new ValidationError(
					'customerId is Required on cart opening'
			)
		}
	}
}

