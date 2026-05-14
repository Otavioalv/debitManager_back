import { Request, Response } from "express";
import { ApiResponse } from "@/shared/http/ApiResponse";
import { CustomersService } from "./customers.service";
import { CustomerResponseDTO } from "./customers.dto";

export class CustomersController {
    constructor(
        private customerService: CustomersService
    ) {}

    // list customers
    public listCustomers = async (req: Request, res: Response):Promise<ApiResponse> => {
        const data:CustomerResponseDTO[] = await this.customerService.listCustomers();

        return ApiResponse.success(res, {
            message: "Products fetched successfully",
            data
        });
    }

    // list customers by id
}
