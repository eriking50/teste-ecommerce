import { CartItemPeriodicity, CartItemType } from '../enums/CartItem.enum'
import { ValidationError } from '../errors/Validation.error'
import { BaseDTOValidator } from '../interfaces/base.dto'
import { validate as validateUUID } from "uuid";

export class AddCartItemDTO implements BaseDTOValidator {
	public productId: string
	public type: CartItemType
	public quantity: number
	public price: number
	public periodicity: CartItemPeriodicity

	constructor(
		body: Record<string, any>
	) {
		this.productId = body?.productId;
		this.type = body?.type;
		this.quantity = body?.quantity;
		this.price = body?.price;
		this.periodicity = body?.periodicity;
	}

	validate() {
		if (!this.productId || !validateUUID(this.productId)) {
			throw new ValidationError(
				'productId is Required and must be an UUID on adding a cart item'
			)
		}

		const typeList = Object.values(CartItemType)

		if (!this.type || !typeList.includes(this.type)) {
			throw new ValidationError(
					'type is Required on adding a cart item and must be "single" or "subscription"'
			)
		}

		if (!this.quantity || isNaN(Number(this.quantity)) || Number(this.quantity) < 0) {
			throw new ValidationError(
					'quantity is Required on adding a cart item and must be a positive number'
			)
		}

		if (!this.price || isNaN(Number(this.price)) || Number(this.price) < 0) {
			throw new ValidationError(
					'price is Required on adding a cart item and must be a positive number'
			)
		}

		const periodicityList = Object.values(CartItemPeriodicity)

		if (this.type === CartItemType.SUBSCRIPTION) {
			if (!this.periodicity || !periodicityList.includes(this.periodicity)) {
				throw new ValidationError(
						'periodicity is Required on adding a cart item with type "subscription" and must be "monthly", "quarterly" or "yearly"'
				)
			}

			if (this.quantity > 1) {
				throw new ValidationError(
						'quantity cannot be greater than 1 on adding a cart item with type "subscription"'
				)
			}
		}
	}
}

