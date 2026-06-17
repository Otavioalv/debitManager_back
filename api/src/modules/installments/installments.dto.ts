import { InstallmentStatus } from "@generated/prisma/enums";

/* 
id String
contractId String
installmentNumber Int
originalAmount String
remainingAmount String
accruedInterest String
dueDate DateTime
paidAt DateTime?
status InstallmentStatus
createdAt DateTime
updatedAt DateTime

// contract Contract
// payments Payment[]
*/


export interface InstallmentResponseDTO {
    id: string,
    contractId: string,
    installmentNumber: number,
    originalAmount: string,
    remainingAmount: string,
    accruedInterest: string,
    dueDate: string,
    paidAt: string | null,
    status: InstallmentStatus,
    createdAt: string,
    updatedAt: string,
}
