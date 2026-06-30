import { CreateInstallmentBody } from "@/modules/installments/installments.types";
import { GenerateInstallmentsForContractInput } from "./types";
import { calculateDueAt } from "./calculateDueAt";
import { calculateAmountPlan } from "./calculateAmountPlan";
import { adjustBusinessDay } from "./adjustBusinessDay";


export function generateInstallmentsForContract({ 
    id, 
    totalAmount, 
    installmentCount, 
    startAt, 
    installmentFrequency,
    skipSaturday,
    skipSunday,
}: GenerateInstallmentsForContractInput): CreateInstallmentBody[] {

    const {amountPerInstallment, remainder} = calculateAmountPlan({
        totalAmount,
        installmentCount,
    });

    const installments: CreateInstallmentBody[] = [];

    let dueAt = startAt;

    dueAt = adjustBusinessDay({
        date: dueAt,
        skipSaturday,
        skipSunday
    });

    for(let i = 1; i <= installmentCount; i++) {

        const amount = amountPerInstallment + (
            i === installmentCount
                ? remainder
                : BigInt(0));

        installments.push({
            contractId: id,
            installmentNumber: i,
            originalAmount: amount.toString(),
            remainingAmount: amount.toString(),
            dueAt: dueAt,
        });

        dueAt = calculateDueAt({
            installmentFrequency,
            startAt: dueAt,
        });

        dueAt = adjustBusinessDay({
            date: dueAt,
            skipSaturday,
            skipSunday
        });
    }
    
    return installments;
}
