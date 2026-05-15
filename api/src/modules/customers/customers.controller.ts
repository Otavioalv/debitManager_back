import { Request, Response } from "express";
import { ApiResponse } from "@/shared/http/ApiResponse";
import { CustomersService } from "./customers.service";
import { CustomerResponseDTO } from "./customers.dto";
import { FilterListCustomerParams } from "./customers.type";

export class CustomersController {
    constructor(
        private customerService: CustomersService
    ) {}

    // list customers
    public listCustomers = async (req: Request, res: Response):Promise<ApiResponse> => {
        const filter:FilterListCustomerParams = res.locals.validated.query as FilterListCustomerParams;

        const data:CustomerResponseDTO[] = await this.customerService.listCustomers(filter);

        return ApiResponse.success(res, {
            message: "Products fetched successfully",
            data,
            meta: {
                filters: filter
            }
        });
    }

    // list customers by id
}
