import { InstallmentFrequency } from "@generated/prisma/enums";

export type GenerateInstallmentsForContractInput = {
    contractId: string;
    totalAmount: string;
    installmentCount: number;

    // startDate: Date;

    // installmentFrequency: InstallmentFrequency;

    // skipSaturday: boolean;
    // skipSunday: boolean;
}
