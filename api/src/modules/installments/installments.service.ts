import { DatabaseService } from "@/shared/database/database.service";
import { InstallmentsRepository } from "./installments.repository";
import { FilterListInstallmentsParams } from "./installments.types";
import { InstallmentMapper } from "./installments.mapper";
import { DataWithPagination } from "@/shared/http/response.types";
import { InstallmentResponseDTO } from "./installments.dto";


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
}
