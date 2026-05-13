import { CustomersService } from "./customers.service";

export class CustomersController {
    constructor(
        private customerService: CustomersService
    ) {}
    

    public listCustomer = async (): Promise<void> => {
        console.log("list customer controller");
        await this.customerService.listCustomer();
    }
}
