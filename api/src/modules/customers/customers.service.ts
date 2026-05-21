import { CustomersRepository } from "./customers.repository";
import { CustomersMapper } from "./customers.mapper";
import { CustomerResponseDTO } from "./customers.dto";
import { CreateCustomerBody, FilterListCustomerParams, UpdateCustomerBody } from "./customers.type";
import { AppError } from "@/shared/http/AppError";
import { Customer } from "@generated/prisma/client";
import { DataWithPagination } from "@/shared/http/response.types";


export class CustomersService {
    constructor(
        private customersRepository: CustomersRepository,
    ) {}

    public async listCustomers(filter: FilterListCustomerParams): Promise<DataWithPagination<CustomerResponseDTO[]>> {
        const response:DataWithPagination<Customer[]> = await this.customersRepository.listCustomers(filter);
        const {data, pagination} = response;

        const resList: DataWithPagination<CustomerResponseDTO[]> = {
            data: data.map(CustomersMapper.toResponse),
            pagination,
        }

        return resList;
    }

    public async getCustomerById(id: string): Promise<CustomerResponseDTO> {
        const customer:Customer | null = await this.customersRepository.getCustomerById(id);

        // If customer is not found, throw a 404 error
        if(!customer) {
            throw AppError.notFound("Customer not found");
        }

        return CustomersMapper.toResponse(customer);
    }

    public async createCustomer(data: CreateCustomerBody): Promise<CustomerResponseDTO> {
        const customer:Customer = await this.customersRepository.createCustomer(data);
        return CustomersMapper.toResponse(customer);
    }

    public async updateCustomer(id: string, data: UpdateCustomerBody): Promise<CustomerResponseDTO> {
        const customer:Customer = await this.customersRepository.updateCustomer(id, data);
        return CustomersMapper.toResponse(customer);
    }

    public async deleteCustomer(id: string): Promise<void> {
        await this.customersRepository.deleteCustomer(id);
    }

    public async deleteManyCustomers(ids: string[]): Promise<number> {
        return await this.customersRepository.deleteManyCustomers(ids);
    }
}
