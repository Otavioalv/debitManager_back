import { DatabaseService } from "@/shared/database/database.service";
import { InstallmentsRepository } from "./installments.repository";
import { FilterListInstallmentsParams } from "./installments.types";
import { InstallmentMapper } from "./installments.mapper";
import { DataWithPagination } from "@/shared/http/response.types";
import { InstallmentResponseDTO } from "./installments.dto";
import { AppError } from "@/shared/http/AppError";
import { Installment } from "@generated/prisma/client";


export class InstallmentsService {
    constructor(
        private installmentsRepository: InstallmentsRepository,
        private databaseService: DatabaseService,

    ){}

    public async listAllInstallments(filter: FilterListInstallmentsParams): Promise<DataWithPagination<InstallmentResponseDTO[]>> {
        const response = await this.installmentsRepository.listAllInstallments(this.databaseService.client, filter);        
        const {data, pagination} = response;

        const resList = {
            data: data.map(InstallmentMapper.toResponse), 
            pagination,
        }

        return resList;
    }

    public async ensureNoPaidInstallments(contractId: string): Promise<void>{
        const hasPaid = await this.installmentsRepository.hasPaidInstallments(this.databaseService.client, contractId);
        
        // Pode não necessariamente não ser um erro.
        if(hasPaid) {
            throw AppError.conflict("Contract has paid installments");
        }
    }

    public async getInstallmentById(id:string): Promise<InstallmentResponseDTO>{
        const installment = await this.getInstallmentOrThrow(id);
        return InstallmentMapper.toResponse(installment);
    }

    private async getInstallmentOrThrow(id: string): Promise<Installment>{
        const installment: Installment | null = await this.installmentsRepository.getInstallmentById(this.databaseService.client, id);
        if(!installment){
            throw AppError.notFound("Contract not found");
        }        

        return installment;
    }
}
