import { CustomersService } from "./customers.service";

export class CustomersController {
    constructor(
        private customerService: CustomersService
    ) {}
    

    public listCustomer = async () => {
        console.log("list customer controller");

        await this.customerService.listCustomer();
    }
}
