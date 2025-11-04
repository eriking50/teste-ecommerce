import CartItemRepositoryInstance, { CartItemRepository } from "src/infrastructure/repository/cartItem.repository";
import { AddCartItemDTO } from "src/shared/dtos/addCartItem.dto";

export class CartItemService {
	constructor(private readonly cartRepository: CartItemRepository) {}

	async addItem(cartId: string, data: AddCartItemDTO) {
		return await this.cartRepository.addItem(cartId, data)
	}

	async removeItem(cartId: string, itemId: string) {
		await this.cartRepository.removeItem(cartId, itemId)
	}
}

export default new CartItemService(CartItemRepositoryInstance)
