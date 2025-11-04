import { DataSource } from "typeorm";
import TypeormDataSource from "./DataSource";
import { CartEntity } from "../entities/Cart.entity";
import { CustomerEntity } from "../entities/Customer.entity";
import { OpenCartDTO } from "src/shared/dtos/openCart.dto";
import { CartStatus } from "src/shared/enums/Cart.enum";
import { HttpError } from "src/shared/errors/Base.error";

export class CartRepository {

  constructor(private readonly database: DataSource) {}

  async create(data: OpenCartDTO) {
    const customer = await this.database.getRepository(CustomerEntity).findOneBy({id: data.customerId})

    if (!customer) {
      throw new HttpError(422, 'Customer not found')
    }

    return await this.database.getRepository(CartEntity).save({ customerId: customer.id, status: CartStatus.OPEN })
  }

  async findByCustomerId(data: OpenCartDTO) {
    return await this.database.getRepository(CartEntity).findOne({where: {
      status: CartStatus.OPEN,
      customer: {id: data.customerId }
    }})
  }

}

export default new CartRepository(TypeormDataSource)