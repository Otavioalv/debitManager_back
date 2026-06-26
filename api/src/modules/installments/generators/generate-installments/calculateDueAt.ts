import { InstallmentFrequency } from "@generated/prisma/enums";
import { addDays, addMonths, addYears } from "date-fns";

export interface CalculateDueAtParams {
    installmentFrequency: InstallmentFrequency;
    startAt: Date;
}

export function calculateDueAt({
    installmentFrequency,
    startAt,
}: CalculateDueAtParams): Date{
    switch(installmentFrequency) {
        case InstallmentFrequency.DAILY:
            return addDays(startAt, 1);
        case InstallmentFrequency.WEEKLY: 
            return addDays(startAt, 7);
        case InstallmentFrequency.BIWEEKLY:
            return addDays(startAt, 14);
        case InstallmentFrequency.MONTHLY:
            return addMonths(startAt, 1);
        case InstallmentFrequency.ANNUALLY:
            return addYears(startAt, 1);
    }
}

