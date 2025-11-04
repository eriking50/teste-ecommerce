import { DataSource } from "typeorm";
import TypeormDataSource from "./DataSource";
import { CartEntity } from "../entities/Cart.entity";
import { AddCartItemDTO } from "src/shared/dtos/addCartItem.dto";
import { CartItemEntity } from "../entities/CartItem.entity";
import { ProductEntity } from "../entities/Product.entity";
import { HttpError } from "src/shared/errors/Base.error";

export class CartItemRepository {

  constructor(private readonly database: DataSource) {}

  async addItem(cartId: string, data: AddCartItemDTO) {
    const cart = await this.database.getRepository(CartEntity).findOneBy({id: cartId})

    if (!cart) {
      throw new HttpError(422, 'Cart not found')
    }

    const product = await this.database.getRepository(ProductEntity).findOneBy({id: data.productId})

    if (!product) {
      throw new HttpError(422, 'Product not found')
    }

    const alreadyOnCart = await this.database.getRepository(CartItemEntity).findOne({where: {
      cartId,
      productId: data.productId
    }})

    if (alreadyOnCart) {
      throw new HttpError(422, 'Product already on the cart')
    }

    return await this.database.getRepository(CartItemEntity).save({...data, cartId})
  }

  async findByIdandCarId(cartId: string, itemId: string) {
    return await this.database.getRepository(CartItemEntity).findOne({where: {
      cartId,
      id: itemId,
    }})
  }

  async removeItem(cartId: string, itemId: string) {
    const item = await this.findByIdandCarId(cartId, itemId);

      if (!item) {
      throw new HttpError(422, 'Cart Item not found')
    }

    await this.database.getRepository(CartItemEntity).remove(item)
  }
}

export default new CartItemRepository(TypeormDataSource)