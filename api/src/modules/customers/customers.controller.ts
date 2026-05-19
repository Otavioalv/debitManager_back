import { Request, Response } from "express";
import { ApiResponse } from "@/shared/http/ApiResponse";
import { CustomersService } from "./customers.service";
import { CustomerResponseDTO, DataWithPagination } from "./customers.dto";
import { CreateCustomerBody, FilterListCustomerParams, UpdateCustomerBody } from "./customers.type";

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
            statusCode: 200,
            message: "Customer fetched successfully",
            data,
        });
    }

    public createCustomer = async (req: Request, res: Response):Promise<ApiResponse> => {
        const createData = res.locals.validated.body as CreateCustomerBody;

        const data:CustomerResponseDTO = await this.customerService.createCustomer(createData);

        return ApiResponse.success(res, {
            statusCode: 201,                
            message: "Customer created successfully",
            data,
        });
    }

    public updateCustomer = async (req: Request, res: Response):Promise<ApiResponse> => {
        const { id } = res.locals.validated.params as { id: string };
        const updateData = res.locals.validated.body as UpdateCustomerBody;

        const data:CustomerResponseDTO = await this.customerService.updateCustomer(id, updateData);

        return ApiResponse.success(res, {
            statusCode: 200,
            message: "Customer updated successfully",
            data,
        });
    }
}
