import BillingEngineRepositoryInstance, { BillingEngineRepository } from "src/infrastructure/repository/billingEngine.repository";


export class BillingEngineService {
	constructor(private readonly billingEngineRepository: BillingEngineRepository) {}

	async execute() {
		await this.billingEngineRepository.execute()
	}
}

export default new BillingEngineService(BillingEngineRepositoryInstance)
