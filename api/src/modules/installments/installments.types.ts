import z from "zod";
import { listInstallmentsQuerySchema } from "./installmnets.schema";
import { Prisma } from "@generated/prisma/client";


export type FilterListInstallmentsParams = z.infer<typeof listInstallmentsQuerySchema>;



/* 
contractId String @db.Uuid
installmentNumber Int                          // Número da parcela (1, 2, 3, ...)
originalAmount BigInt               // Valor original da parcela
dueDate DateTime         // Data de vencimento da parcela
// payments Payment[]

contractId,
installmentNumber,
originalAmount
dueDate,
remainingAmount,
*/

export interface CreateInstallmentBody {
    contractId: string;
    installmentNumber: number;
    originalAmount: string;
    dueAt: Date;
    remainingAmount: string;
    
    // payments Payment[]
}

export type InstallmentUpdateParams = Partial<Pick<Prisma.InstallmentCreateInput,
    "remainingAmount"
    | "paidAt"
    | "status"
>>

/* 
criar um para installments
export type ContractCreateParams = Pick<Prisma.ContractCreateInput, 
    "person"
    | "title"
    | "totalAmount"
    | "installmentCount"
    | "installmentFrequency"
    | "interestRate"
    | "interestPeriod"
    | "timezone"
    | "startAt"
    | "skipSaturday"
    | "skipSunday"
    | "description"
>;

export type ContractUpdateParams = Partial<Pick<Prisma.ContractCreateInput, 
    "description"
    | "title"
    | "status"
>>;
*/

