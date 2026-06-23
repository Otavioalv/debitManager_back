import { ContractStatus, InstallmentFrequency, InterestPeriod } from "@generated/prisma/enums";
import z from "zod";

/* 
    id
    title
    description
    personId
    person
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
    person: {
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
    person: {
        id: string;
        name: string;
    };
    totalAmount: string;
    installmentCount: number;
    installmentFrequency: InstallmentFrequency;
    interestRate: string;
    interestPeriod: InterestPeriod;
    timezone: string;
    startDate: string;
    skipSaturday: boolean;
    skipSunday: boolean;
    status: ContractStatus;
    createdAt: string;
    updatedAt: string;
}
