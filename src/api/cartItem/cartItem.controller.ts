import express from 'express'
import CartItemServiceInstance, { CartItemService } from './cartItem.service'
import { AddCartItemDTO } from 'src/shared/dtos/addCartItem.dto'

class CartItemController {
	constructor(private readonly cartItemService: CartItemService) {
	}

	addCartItem = async (req: express.Request<any, any, AddCartItemDTO>, res: express.Response) => {
		const response = await this.cartItemService.addItem(req.params.cartId, req.body)


		res.status(200).json(response);
	}

	removeCartItem = async (req: express.Request, res: express.Response) => {
		await this.cartItemService.removeItem(req.params.cartId, req.params.itemId)

		res.status(204).send();
	}
}

export default new CartItemController(CartItemServiceInstance)