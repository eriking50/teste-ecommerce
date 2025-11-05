import WebhookRepositoryInstance, { WebhookRepository } from "src/infrastructure/repository/webhook.repository";
import { UpdateTransactionStatusDTO } from "src/shared/dtos/updateTransactionStatus.dto";

export class WebhookService {
	constructor(private readonly webhookRepository: WebhookRepository) {}

	async updateTransactionStatus(data: UpdateTransactionStatusDTO) {
		return await this.webhookRepository.updateTransactionStatus(data)
	}
}

export default new WebhookService(WebhookRepositoryInstance)
