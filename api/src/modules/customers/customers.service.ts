import { CustomersRepository } from "./customers.repository";
import { CustomersMapper } from "./customers.mapper";
import { CustomerResponseDTO, DataWithPagination } from "./customers.dto";
import { FilterListCustomerParams } from "./customers.type";
import { AppError } from "@/shared/http/AppError";


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
            throw AppError.notFound("Customer not found");
        }

        return CustomersMapper.toResponse(customer);
    }

    public async createCustomer(name: string, phoneNumber: string, balance: number): Promise<CustomerResponseDTO> {
        const customer = await this.customersRepository.createCustomer(name, phoneNumber, balance);
        return CustomersMapper.toResponse(customer);
    }
}
