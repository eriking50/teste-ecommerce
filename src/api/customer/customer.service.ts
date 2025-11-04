import CustomerRepositoryInstance, { CustomerRepository } from "src/infrastructure/repository/customer.repository";
import { CreateCustomerDTO } from "src/shared/dtos/createCustomer.dto";

export class CustomerService {
	constructor(private readonly customerRepository: CustomerRepository) {}

	async createCustomer(data: CreateCustomerDTO) {
		return await this.customerRepository.create(data)
	}
}

export default new CustomerService(CustomerRepositoryInstance)
