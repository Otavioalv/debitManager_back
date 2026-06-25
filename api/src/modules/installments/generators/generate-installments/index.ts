import { CreateInstallmentBody } from "@/modules/installments/installments.type";
import { GenerateInstallmentsForContractInput } from "./types";
import { calculateDueDate } from "./calculateDueDate";
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

    let dueDate = startAt;

    dueDate = adjustBusinessDay({
        date: dueDate,
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
            dueDate,
        });

        dueDate = calculateDueDate({
            installmentFrequency,
            startDate: dueDate,
        });

        dueDate = adjustBusinessDay({
            date: dueDate,
            skipSaturday,
            skipSunday
        });
    }
    
    return installments;
}
