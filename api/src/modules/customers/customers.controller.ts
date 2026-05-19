import { Request, Response } from "express";
import { ApiResponse } from "@/shared/http/ApiResponse";
import { CustomersService } from "./customers.service";
import { CustomerResponseDTO, DataWithPagination } from "./customers.dto";
import { CreateCustomerBody, FilterListCustomerParams } from "./customers.type";

export class CustomersController {
    constructor(
        private customerService: CustomersService
    ) {}

    // list customers
    public listCustomers = async (req: Request, res: Response):Promise<ApiResponse> => {
        const filter:FilterListCustomerParams = res.locals.validated.query as FilterListCustomerParams;

        const data:DataWithPagination<CustomerResponseDTO[]> = await this.customerService.listCustomers(filter);

        return ApiResponse.success(res, {
            message: "Products fetched successfully",
            data: data.data,
            meta: {
                filters: filter,
                pagination: data.pagination,
            }
        });
    }

    public getCustomerById = async (req: Request, res: Response):Promise<ApiResponse> => {
        const { id } = res.locals.validated.params as { id: string };

        const data:CustomerResponseDTO = await this.customerService.getCustomerById(id);

        // const data:CustomerResponseDTO = await this.customerService.getCustomerById(id);

        return ApiResponse.success(res, {
            message: "Customer fetched successfully",
            data,
        });
    }

    public createCustomer = async (req: Request, res: Response):Promise<ApiResponse> => {
        const { name, phoneNumber, balance } = res.locals.validated.body as CreateCustomerBody;

        const data:CustomerResponseDTO = await this.customerService.createCustomer(name, phoneNumber, balance);

        return ApiResponse.success(res, {
            message: "Customer created successfully",
            data,
        });
    }
}
