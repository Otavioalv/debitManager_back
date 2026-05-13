import { Request, Response } from "express";
import { ApiResponse } from "../../shared/http/ApiResponse";
import { CustomersService } from "./customers.service";

export class CustomersController {
    constructor(
        private customerService: CustomersService
    ) {}
    

    public listCustomer = async (req: Request, res: Response) => {
        console.log("controler list customer");
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        await this.customerService.listCustomer();
        return ApiResponse.success(res, {
            message: "Products fetched successfully",
            data: ["pro2", "pro34", "proN"]
        });
    }
}
