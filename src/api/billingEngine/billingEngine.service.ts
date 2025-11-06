import { validate as validateUUID } from "uuid";
import BillingEngineRepositoryInstance, { BillingEngineRepository } from "src/infrastructure/repository/billingEngine.repository";
import { ValidationError } from "src/shared/errors/Validation.error";


export class BillingEngineService {
	constructor(private readonly cartRepository: BillingEngineRepository) {}

	async forceEngine(subscriptionId: string) {

		if (!validateUUID(subscriptionId)) {
			throw new ValidationError("subscriptionId is not a UUID")
		}

		await this.cartRepository.getEndingSubscriptions(subscriptionId)
	}
}

export default new BillingEngineService(BillingEngineRepositoryInstance)
