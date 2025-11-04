import express from 'express'
import CartServiceInstance, { CustomerService } from './customer.service'
import { CreateCustomerDTO } from 'src/shared/dtos/createCustomer.dto'

class CartController {
	constructor(private readonly customerService: CustomerService) {
		this
	}

	createCustomer = async (req: express.Request<any, any, CreateCustomerDTO>, res: express.Response) => {
		const response = await this.customerService.createCustomer(req.body)

		res.status(200).json(response);
	}
}

export default new CartController(CartServiceInstance)