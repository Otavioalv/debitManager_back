import { Contract, Installment } from "@generated/prisma/client";
import { InstallmentFrequency } from "@generated/prisma/enums";

export type GenerateInstallmentsForContractInput = 
    Pick<
        Contract, 
        'id' 
        | 'installmentCount'
        | 'totalAmount'
        | 'startDate'
        | 'installmentFrequency'
        // | 'skipSaturday'
        // | 'skipSunday'
    >
    &{
    // contractId: string;
    // totalAmount: string;
    // installmentCount: number;

    // startDate: Date;

    // installmentFrequency: InstallmentFrequency;

    // skipSaturday: boolean;
    // skipSunday: boolean;
}
