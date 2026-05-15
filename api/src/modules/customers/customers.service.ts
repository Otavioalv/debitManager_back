import { CustomersRepository } from "./customers.repository";
import { CustomersMapper } from "./customers.mapper";
import { CustomerResponseDTO } from "./customers.dto";


export class CustomersService {
    constructor(
        private customersRepository: CustomersRepository,
    ) {}

    public async listCustomers(filter: FilterListCustomerParams): Promise<CustomerResponseDTO[]>{
        
        const customers = await this.customersRepository.listCustomers(filter);
        return customers.map(CustomersMapper.toResponse);
    }
}
