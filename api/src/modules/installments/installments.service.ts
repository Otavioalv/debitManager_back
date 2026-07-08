import { DatabaseService } from "@/shared/database/database.service";
import { InstallmentsRepository } from "./installments.repository";
import { FilterListInstallmentsParams, InstallmentUpdateParams } from "./installments.types";
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

    public async receivePayment(id: string) {
        // talvez criar um transaction

        // Verifica se installment existe
        const installment = await this.getInstallmentOrThrow(id);

        // verifica se installment foi pago
        if(installment.remainingAmount === "0") throw AppError.conflict("Installment has already been paid");

        // pagar installment com valor inteiro
        return this.receiveFullPayment(id);

        // criar um payment conforme os dados do pagamento ou tipo
        

        // return alguma coisa ai talvez os dados de payment, 
        // ou dados de payments e installments juntos 
        // ou installments e payments juntos

        /* 
            ```
            InstallmentsController.receivePayment(...)
            ```

            ↓

            ```
            InstallmentsService.receivePayment(...)
            ```

            ↓

            ```
            PaymentRepository.create(...)
            InstallmentRepository.update(...)
            ```
        */
    }

    private async receiveFullPayment(id:string) {
        const data: InstallmentUpdateParams = {
            paidAt: new Date(),
            remainingAmount: "0",
            status: "PAID"
        };

        await this.installmentsRepository.updateInstallment(this.databaseService.client, id, data);
    }

    private async getInstallmentOrThrow(id: string): Promise<Installment>{
        const installment: Installment | null = await this.installmentsRepository.getInstallmentById(this.databaseService.client, id);
        if(!installment){
            throw AppError.notFound("Contract not found");
        }        

        return installment;
    }
}
