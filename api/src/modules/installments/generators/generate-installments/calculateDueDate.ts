import { InstallmentFrequency } from "@generated/prisma/enums";
import { addDays, addMonths, addYears } from "date-fns";


export interface CalculateDueDateParams {
    installmentFrequency: InstallmentFrequency;
    startDate: Date;
    installmentNumber: number;
}

export function calculateDueDate({
    installmentFrequency,
    startDate,
    installmentNumber,
}: CalculateDueDateParams): Date{

    switch(installmentFrequency) {
        case InstallmentFrequency.DAILY:
            return addDays(startDate, installmentNumber);
        case InstallmentFrequency.WEEKLY: 
            return addDays(startDate, installmentNumber * 7);
        case InstallmentFrequency.BIWEEKLY:
            return addDays(startDate, installmentNumber * 14);
        case InstallmentFrequency.MONTHLY:
            return addMonths(startDate, installmentNumber);
        case InstallmentFrequency.ANNUALLY:
            return addYears(startDate, installmentNumber);
    }
}
