import { CustomersRepository } from "./customers.repository";


export class CustomersService {
    constructor(
        private customersRepository: CustomersRepository,
    ) {}

    public async listCustomer() {
        console.log("SERVICE LIST");

        await this.customersRepository.listCustomers();
    }
}
