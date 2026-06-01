import { InstallmentFrequency } from "@generated/prisma/enums";



// export type GenerateInstallmentsForContractInput = Omit<Contract, 'createdAt' | 'updatedAt'> & {}
export type CalculateDueDateParams = {
    installmentFrequency: InstallmentFrequency;
    startDate: Date;
    installmentNumber: number;
}

export function calculateDueDate(params: CalculateDueDateParams): Date{


    return new Date();
}
