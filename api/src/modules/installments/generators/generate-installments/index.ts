import { CreateInstallmentBody } from "@/modules/installments/installments.type";
import { GenerateInstallmentsForContractInput } from "./types";
import { calculateDueDate } from "./calculateDueDate";
import { calculateAmountPlan } from "./calculateAmountPlan";


export function generateInstallmentsForContract({ 
    id, 
    totalAmount, 
    installmentCount, 
    startDate, 
    installmentFrequency
}: GenerateInstallmentsForContractInput): CreateInstallmentBody[] {

    const {amountPerInstallment, remainder} = calculateAmountPlan({
        totalAmount,
        installmentCount,
    });

    const installments: CreateInstallmentBody[] = [];

    for(let i = 1; i <= installmentCount; i++) {
        const amount = amountPerInstallment + (
            i === installmentCount
                ? remainder 
                : BigInt(0));

        const dueDate = calculateDueDate({
            installmentNumber: i,
            installmentFrequency,
            startDate,
        });

        installments.push({
            contractId: id,
            installmentNumber: i,
            originalAmount: amount.toString(),
            remainingAmount: amount.toString(),
            dueDate,
        });
    }   


    return installments;
}
