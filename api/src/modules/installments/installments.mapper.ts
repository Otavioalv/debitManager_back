import { Installment } from "@generated/prisma/client";
import { InstallmentResponseDTO } from "./installments.dto";


export class InstallmentMapper {
    static toResponse(installment: Installment): InstallmentResponseDTO{
        return {
            id: installment.id,
            contractId: installment.contractId,
            installmentNumber: installment.installmentNumber,
            
            originalAmount: installment.originalAmount,
            remainingAmount: installment.remainingAmount,
            accruedInterest: installment.accruedInterest,
            
            status: installment.status,
            
            dueAt: installment.dueAt.toISOString(),
            paidAt: installment.paidAt?.toISOString() || null,

            createdAt: installment.createdAt.toISOString(),
            updatedAt: installment.updatedAt.toISOString(),
        }
    }
}
