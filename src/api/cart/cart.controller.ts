import express from 'express'
import { OpenCartDTO } from 'src/shared/dtos/openCart.dto'
import CartServiceInstance, { CartService } from './cart.service'

class CartController {
	constructor(private readonly cartService: CartService) {
		this
	}

	openCart = async (req: express.Request<any, any, OpenCartDTO>, res: express.Response) => {
		const response = await this.cartService.openCart(req.body)

		res.status(200).json(response);
	}

	checkoutCart = async (req: express.Request, res: express.Response) => {
	}
}

export default new CartController(CartServiceInstance)