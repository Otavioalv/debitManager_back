import { CustomersRepository } from "./customers.repository";
import { CustomersMapper } from "./customers.mapper";
import { CustomerResponseDTO, DataWithPagination } from "./customers.dto";
import { FilterListCustomerParams } from "./customers.type";


export class CustomersService {
    constructor(
        private customersRepository: CustomersRepository,
    ) {}

    public async listCustomers(filter: FilterListCustomerParams): Promise<DataWithPagination<CustomerResponseDTO[]>> {
        const response = await this.customersRepository.listCustomers(filter);
        const {data, pagination} = response;

        const resList: DataWithPagination<CustomerResponseDTO[]> = {
            data: data.map(CustomersMapper.toResponse),
            pagination,
        }

        return resList;
    }

    public async getCustomerById(id: string): Promise<CustomerResponseDTO> {
        const customer = await this.customersRepository.getCustomerById(id);

        if(!customer) {
            throw new Error("Customer not found");
        }

        return CustomersMapper.toResponse(customer);
    }
}
