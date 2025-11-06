import express from 'express'
import BillingEngineServiceInstance, { BillingEngineService } from './billingEngine.service'

class BillingEngineController {
	constructor(private readonly billingEngineService: BillingEngineService) {}

	execute = async (req: express.Request, res: express.Response) => {
		await this.billingEngineService.execute()

		res.status(204).send();
	}
}

export default new BillingEngineController(BillingEngineServiceInstance)