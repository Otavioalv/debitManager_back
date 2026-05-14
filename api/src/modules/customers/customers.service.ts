import { CustomersRepository } from "./customers.repository";
import { CustomersMapper } from "./customers.mapper";
import { CustomerResponseDTO } from "./customers.dto";


export class CustomersService {
    constructor(
        private customersRepository: CustomersRepository,
    ) {}

    public async listCustomers(): Promise<CustomerResponseDTO[]>{
        
        const customers = await this.customersRepository.listCustomers();
        return customers.map(CustomersMapper.toResponse);
    }
}
