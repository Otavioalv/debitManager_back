import { CustomersRepository } from "./customers.repository";


export class CustomersService {
    constructor(
        private customersRepository: CustomersRepository,
    ) {}

    public async listCustomers() {
        console.log("SERVICE LIST");

        await this.customersRepository.listCustomers();
    }
}
