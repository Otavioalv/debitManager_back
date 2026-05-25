import { ContractDetailsResponseDTO } from "./contracts.dto";
import { ContractWithCustomer } from "./contracts.types";

export class ContractsMapper {
    static toDetailsResponse(contract: ContractWithCustomer): ContractDetailsResponseDTO {
        return {
            id: contract.id.toString(),
            title: contract.title,
            description: contract.description,
            customer: {
                id: contract.customer.id.toString(),
                name: contract.customer.name,
            },
            totalAmount: contract.totalAmount.toString(),
            installmentCount: contract.installmentCount,
            installmentFrequency: contract.installmentFrequency,
            interestRate: contract.interestRate.toString(),
            interestPeriod: contract.interestPeriod,
            startDate: contract.startDate.toISOString(),
            skipSaturday: contract.skipSaturday,
            skipSunday: contract.skipSunday,
            status: contract.status,
            createdAt: contract.createdAt.toISOString(),
            updatedAt: contract.updatedAt.toISOString(),
        }
    }
}

