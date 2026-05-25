import { ExtendedPrismaClient } from "@/shared/database/prisma";
import { ContractStatus, InstallmentFrequency, InterestPeriod } from "@generated/prisma/enums";
import { FilterListContractsParams } from "./contracts.types";
import { Prisma } from "@generated/prisma/client";
import { OrderByMap } from "@/shared/types";


export class ContractsRepository {
    constructor (
        private prisma: ExtendedPrismaClient
    ){}

    public async listContracts(filter: FilterListContractsParams) {
        // // criar muitos contratos para teste
        // for(let i = 1; i <= 100; i++) {
        //     // pegar id aleatorio de uma lista de customers
        //     const customers = await this.prisma.customer.findMany();
        //     const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
            
        //     await this.prisma.contract.create({
        //         data: {
        //             title: `Contract ${i}`,
        //             description: `Description for Contract ${i}`,
        //             installmentCount: 12,
        //             customerId: randomCustomer.id,
        //             installmentFrequency: ["DAILY", "WEEKLY", "BIWEEKLY", "MONTHLY", "ANNUALLY"][Math.floor(Math.random() * 5)] as InstallmentFrequency,
        //             totalAmount: Math.floor(Math.random() * 10000) + 1000,
        //             interestPeriod: ["DAILY", "MONTHLY", "ANNUALLY"][Math.floor(Math.random() * 3)] as InterestPeriod, 
        //             interestRate: parseFloat((Math.random() * 20).toFixed(2)),
        //             startDate: new Date(),
        //             skipSaturday: Math.random() < 0.5,
        //             skipSunday: Math.random() < 0.5,
        //             status: ["ACTIVE", "FINISHED", "CANCELED", "DEFAULTED"][Math.floor(Math.random() * 4)] as ContractStatus
        //         }
        //     });
        // }

        const orderByMap:OrderByMap<
            FilterListContractsParams["sortBy"], 
            Prisma.ContractOrderByWithRelationInput
        > = {
            customerName: {
                customer: {
                    name: "asc",
                },
            },
            startDate: {
                startDate: "desc",
            },
            title: {
                title: "asc",
            },
        };


        const contracts = await this.prisma.contract.findMany({
            where: {
                ...(filter.search && {
                    OR: [
                        {
                            customer: {
                                name: {
                                    contains: filter.search,
                                    mode: "insensitive",
                                },
                            },
                        },

                        {
                            title: {
                                contains: filter.search,
                                mode: "insensitive",
                            },
                        },
                    ],
                }),
            },
            orderBy: [
                orderByMap[filter.sortBy ?? "customerName"],
                {
                    id: "asc",
                }
            ],
            take: filter.limit + 1,
        });
        return contracts;
    }
}