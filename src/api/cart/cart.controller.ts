import express from 'express'
import { OpenCartDTO } from 'src/shared/dtos/openCart.dto'
import CartServiceInstance, { CartService } from './cart.service'
import { CheckoutCartDTO } from 'src/shared/dtos/checkoutCart.dto'

class CartController {
	constructor(private readonly cartService: CartService) {}

	openCart = async (req: express.Request<any, any, OpenCartDTO>, res: express.Response) => {
		const response = await this.cartService.openCart(req.body)

		res.status(200).json(response);
	}

	checkoutCart = async (req: express.Request<any, any, CheckoutCartDTO>, res: express.Response) => {
		const response = await this.cartService.checkoutCart(req.params.cartId, req.body)

		res.status(200).json(response);
	}
}

export default new CartController(CartServiceInstance)