import CartItemRepositoryInstance, { CartItemRepository } from "src/infrastructure/repository/cartItem.repository";
import { AddCartItemDTO } from "src/shared/dtos/addCartItem.dto";
import { ValidationError } from "src/shared/errors/Validation.error";
import { validate as validateUUID } from "uuid";

export class CartItemService {
	constructor(private readonly cartRepository: CartItemRepository) {}

	async addItem(cartId: string, data: AddCartItemDTO) {
		if (!validateUUID(cartId)) {
			throw new ValidationError("cartId is not a UUID")
		}

		return await this.cartRepository.addItem(cartId, data)
	}

	async removeItem(cartId: string, itemId: string) {
		if (!validateUUID(cartId) || !!validateUUID(itemId)) {
			throw new ValidationError("cartId is not a UUID")
		}

		await this.cartRepository.removeItem(cartId, itemId)
	}
}

export default new CartItemService(CartItemRepositoryInstance)
