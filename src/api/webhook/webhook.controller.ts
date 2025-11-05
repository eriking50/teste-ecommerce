import express from 'express'
import WebhookServiceInstance, { WebhookService } from './webhook.service'
import { UpdateTransactionStatusDTO } from 'src/shared/dtos/updateTransactionStatus.dto';

class CartController {
	constructor(private readonly customerService: WebhookService) {
	}

	createCustomer = async (req: express.Request<any, any, UpdateTransactionStatusDTO>, res: express.Response) => {
		await this.customerService.updateTransactionStatus(req.body)

		res.status(204).send();
	}
}

export default new CartController(WebhookServiceInstance)