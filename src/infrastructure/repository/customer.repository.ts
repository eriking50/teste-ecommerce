import { DataSource } from "typeorm";
import TypeormDataSource from "./DataSource";
import { CustomerEntity } from "../entities/Customer.entity";
import { HttpError } from "src/shared/errors/Base.error";
import { CreateCustomerDTO } from "src/shared/dtos/createCustomer.dto";

export class CustomerRepository {

  constructor(private readonly database: DataSource) {}

  async create(data: CreateCustomerDTO) {
    const customer = await this.database.getRepository(CustomerEntity).findOneBy({email: data.email})

    if (customer) {
      throw new HttpError(422, 'Customer already registered')
    }

    return await this.database.getRepository(CustomerEntity).save(data)
  }
}

export default new CustomerRepository(TypeormDataSource)