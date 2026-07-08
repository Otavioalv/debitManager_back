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

    // listar por id
    public getInstallmentById = async (req: Request, res: Response): Promise<ApiResponse>=> {
        const {id} = res.locals.validated.params as { id: string };

        const data = await this.installmentsService.getInstallmentById(id);
        
        return ApiResponse.ok(res, data, "Contract fetched successfully");
    }

    // efetuar pagamento
    public receivePayment = async (req: Request, res: Response): Promise<ApiResponse> => {
        const {id} = res.locals.validated.params as { id: string }; 
        await this.installmentsService.receivePayment(id);

        return ApiResponse.ok(res, ["penis"], "Payment successfully made");
    }
}
