import { InstallmentFrequency } from "@generated/prisma/enums";
import { addDays, addMonths, addYears } from "date-fns";

export interface CalculateDueDateParams {
    installmentFrequency: InstallmentFrequency;
    startDate: Date;
}

export function calculateDueDate({
    installmentFrequency,
    startDate,
}: CalculateDueDateParams): Date{
    switch(installmentFrequency) {
        case InstallmentFrequency.DAILY:
            return addDays(startDate, 1);
        case InstallmentFrequency.WEEKLY: 
            return addDays(startDate, 7);
        case InstallmentFrequency.BIWEEKLY:
            return addDays(startDate, 14);
        case InstallmentFrequency.MONTHLY:
            return addMonths(startDate, 1);
        case InstallmentFrequency.ANNUALLY:
            return addYears(startDate, 1);
    }
}

