import { ContractDetailsResponseDTO } from "./contracts.dto";
import { ContractWithPerson } from "./contracts.types";

export class ContractsMapper {
    static toDetailsResponse(contract: ContractWithPerson): ContractDetailsResponseDTO {
        return {
            id: contract.id.toString(),
            title: contract.title,
            description: contract.description,
            person: {
                id: contract.person.id.toString(),
                name: contract.person.name,
            },
            totalAmount: contract.totalAmount.toString(),
            installmentCount: contract.installmentCount,
            installmentFrequency: contract.installmentFrequency,
            interestRate: contract.interestRate.toString(),
            interestPeriod: contract.interestPeriod,
            timezone: contract.timezone,
            startAt: contract.startAt.toISOString(),
            skipSaturday: contract.skipSaturday,
            skipSunday: contract.skipSunday,
            status: contract.status,
            createdAt: contract.createdAt.toISOString(),
            updatedAt: contract.updatedAt.toISOString(),
        }
    }
}

