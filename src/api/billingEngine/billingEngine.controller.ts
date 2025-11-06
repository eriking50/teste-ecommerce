import express from 'express'
import BillingEngineServiceInstance, { BillingEngineService } from './billingEngine.service'

class BillingEngineController {
	constructor(private readonly billingEngineService: BillingEngineService) {}

	forceEngine = async (req: express.Request, res: express.Response) => {
		const response = await this.billingEngineService.forceEngine(req.params.subscriptionId)

		res.status(200).json(response);
	}
}

export default new BillingEngineController(BillingEngineServiceInstance)