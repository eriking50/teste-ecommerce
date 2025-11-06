import { ValidationError } from '../errors/Validation.error';
import { BaseDTOValidator } from '../interfaces/base.dto'
import { validate as validateUUID } from "uuid";

export class OpenCartDTO implements BaseDTOValidator {
	public customerId: string

	constructor(
		body: Record<string, any>
	) {
		this.customerId = body?.customerId;
	}

	validate() {
		if (!this.customerId || !validateUUID(this.customerId)) {
			throw new ValidationError(
					'customerId is Required and must be an UUID on cart opening'
			)
		}
	}
}

