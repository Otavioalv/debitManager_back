import { Customer } from "@generated/prisma/client";
import { CustomersRepository } from "./customers.repository";


export class CustomersService {
    constructor(
        private customersRepository: CustomersRepository,
    ) {}

    public async listCustomers(): Promise<Customer[]>{
        return await this.customersRepository.listCustomers();
    }
}
