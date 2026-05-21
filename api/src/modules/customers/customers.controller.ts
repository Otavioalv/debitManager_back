import { Request, Response } from "express";
import { ApiResponse } from "@/shared/http/ApiResponse";
import { CustomersService } from "./customers.service";
import { CustomerResponseDTO } from "./customers.dto";
import { CreateCustomerBody, FilterListCustomerParams, UpdateCustomerBody } from "./customers.type";
import { DataWithPagination } from "@/shared/http/response.types";

export class CustomersController {
    constructor(
        private customerService: CustomersService
    ) {}

    // list customers
    public listCustomers = async (req: Request, res: Response):Promise<ApiResponse> => {
        const filter:FilterListCustomerParams = res.locals.validated.query as FilterListCustomerParams;

        const data:DataWithPagination<CustomerResponseDTO[]> = await this.customerService.listCustomers(filter);

        return ApiResponse.ok(res, data, "Customers fetched successfully");
    }

    public getCustomerById = async (req: Request, res: Response):Promise<ApiResponse> => {
        const { id } = res.locals.validated.params as { id: string };

        const data:CustomerResponseDTO = await this.customerService.getCustomerById(id);

        return ApiResponse.ok(res, data, "Customer fetched successfully");
    }

    public createCustomer = async (req: Request, res: Response):Promise<ApiResponse> => {
        const createData = res.locals.validated.body as CreateCustomerBody;

        const data:CustomerResponseDTO = await this.customerService.createCustomer(createData);

        return ApiResponse.created(res, data, "Customer created successfully");
    }

    public updateCustomer = async (req: Request, res: Response):Promise<ApiResponse> => {
        const { id } = res.locals.validated.params as { id: string };
        const updateData = res.locals.validated.body as UpdateCustomerBody;

        const data:CustomerResponseDTO = await this.customerService.updateCustomer(id, updateData);

        return ApiResponse.ok(res, data, "Customer updated successfully");
    }

    public deleteCustomer = async (req: Request, res: Response):Promise<ApiResponse> => {
        const { id } = res.locals.validated.params as { id: string };

        await this.customerService.deleteCustomer(id);

        return ApiResponse.ok(res, null, "Customer deleted successfully");
    }

    public deleteManyCustomers = async (req: Request, res: Response):Promise<ApiResponse> => {
        const { ids } = res.locals.validated.body as { ids: string[] };

        const deleted:number = await this.customerService.deleteManyCustomers(ids);

        return ApiResponse.ok(res, { deleted }, "Customers deleted successfully");
    }
}
