import { ExtendedPrismaClient } from "@/shared/database/prisma";
import { ContractStatus, InstallmentFrequency, InterestPeriod } from "@generated/prisma/enums";


export class ContractsRepository {
    constructor (
        private prisma: ExtendedPrismaClient
    ){}

    public async listContracts() {
        // criar muitos contratos para teste
        // for(let i = 1; i <= 1; i++) {
        //     // pegar id aleatorio de uma lista de customers
        //     const customers = await this.prisma.customer.findMany();
        //     const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
            
        //     await this.prisma.contract.create({
        //         data: {
        //             title: `Contract ${i}`,
        //             description: `Description for Contract ${i}`,
        //             installmentCount: 12,
        //             customerId: randomCustomer.id,
        //             installmentFrequency: ["DAILY", "WEEKLY", "BIWEEKLY", "MONTHLY", "ANNUALLY"][Math.floor(Math.random() * 3)] as InstallmentFrequency,
        //             totalAmount: Math.floor(Math.random() * 10000) + 1000,
        //             interestPeriod: ["DAILY", "MONTHLY", "ANNUALLY"][Math.floor(Math.random() * 3)] as InterestPeriod, 
        //             interestRate: parseFloat((Math.random() * 20).toFixed(2)),
        //             startDate: new Date(),
        //             skipSaturday: Math.random() < 0.5,
        //             skipSunday: Math.random() < 0.5,
        //             status: ["ACTIVE", "FINISHED", "CANCELED", "DEFAULTED"][Math.floor(Math.random() * 3)] as ContractStatus
        //         }
        //     });
        // }

        const contracts = await this.prisma.contract.findMany();
        return contracts;
    }
}