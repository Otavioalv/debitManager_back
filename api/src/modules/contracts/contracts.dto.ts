import { ContractStatus, InstallmentFrequency, InterestPeriod } from "@generated/prisma/enums";

/* 
    id
    title
    description
    customerId
    customer
    totalAmount
    installmentCount
    installmentFrequency
    interestRate
    interestPeriod
    startDate
    skipSaturday
    skipSunday
    createdAt
    updatedAt
*/


export interface ContractListResponseDTO {
    id: string;
    title: string;
    customer: {
        id: string;
        name: string;
    };
    totalAmount: string;
    installmentCount: number;
    startDate: string;
    status: ContractStatus;
}

export interface ContractDetailsResponseDTO {
    id: string;
    title: string;
    description: string | null;
    customer: {
        id: string;
        name: string;
    };
    totalAmount: string;
    installmentCount: number;
    installmentFrequency: InstallmentFrequency;
    interestRate: string;
    interestPeriod: InterestPeriod;
    startDate: string;
    skipSaturday: boolean;
    skipSunday: boolean;
    status: ContractStatus;
    createdAt: string;
    updatedAt: string;
}

