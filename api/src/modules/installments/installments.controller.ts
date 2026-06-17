import { ApiResponse } from "@/shared/http/ApiResponse";
import { FilterListInstallmentsParams } from "./installments.types";
import { Request, Response } from "express";
import { DataWithPagination } from "@/shared/http/response.types";
import { InstallmentResponseDTO } from "./installments.dto";
import { InstallmentsService } from "./installments.service";


export class InstallmentsController {
    constructor(
        private installmentsService: InstallmentsService
    ){}

    // list installment
    public listAllInstallments = async (req: Request, res: Response):Promise<ApiResponse> => {
        const filter: FilterListInstallmentsParams = res.locals.validated.query as FilterListInstallmentsParams
        
        const data: DataWithPagination<InstallmentResponseDTO[]> = await this.installmentsService.listAllInstallments(filter);
        
        return ApiResponse.ok(res, data, "Installments fetched successfully");
    }
}
