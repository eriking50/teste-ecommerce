import CartRepositoryInstance, {CartRepository} from "src/infrastructure/repository/cart.repository"
import { CheckoutCartDTO } from "src/shared/dtos/checkoutCart.dto";
import { OpenCartDTO } from "src/shared/dtos/openCart.dto"

export class CartService {
	constructor(private readonly cartRepository: CartRepository) {}

	async openCart(data: OpenCartDTO) {
		const openedCart = await this.cartRepository.findByCustomerId(data)

		if (openedCart) {
			return {id: openedCart.id, status: openedCart.status}
		}

		const newCart = await this.cartRepository.create(data);
		return {id: newCart.id, status: newCart.status}
	}

	async checkoutCart(cartId: string,  data: CheckoutCartDTO) {
		return await this.cartRepository.checkout(cartId, data);
	}
}

export default new CartService(CartRepositoryInstance)
