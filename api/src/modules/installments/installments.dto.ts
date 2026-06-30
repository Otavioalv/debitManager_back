import { InstallmentStatus } from "@generated/prisma/enums";


export interface InstallmentResponseDTO {
    id: string,
    contractId: string,
    installmentNumber: number,
    originalAmount: string,
    remainingAmount: string,
    accruedInterest: string,
    dueAt: string,
    paidAt: string | null,
    status: InstallmentStatus,
    createdAt: string,
    updatedAt: string,
}
