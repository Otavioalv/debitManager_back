import { DbClient, ExtendedPrismaClient } from "@/shared/database/database.types";
import { ContractWithCustomer, CreateContractBody, FilterListContractsParams, UpdateContractBody } from "./contracts.types";
import { Prisma } from "@generated/prisma/client";
import { buildPaginatedResponse } from "@/shared/utils/pagination.utils";
import { DataWithPagination } from "@/shared/http/response.types";
import { OrderByMap } from "@/shared/types";


export class ContractsRepository {
    
    constructor (
        // private prisma: ExtendedPrismaClient
    ){}

    public async listContracts(db: DbClient, filter: FilterListContractsParams):Promise<DataWithPagination<ContractWithCustomer[]>> {
        // Separar o tipo, para arquivo types no mesmo modulo
        const {order} = filter;

        const orderByMap:OrderByMap<
            FilterListContractsParams["sortBy"], 
            Prisma.ContractOrderByWithRelationInput
        > = {
            customerName: {
                customer: {
                    name: order,
                },
            },
            startDate: {
                startDate: order,
            },
            title: {
                title: order,
            },
        };

        const dataPaginated = await db.contract.findMany({
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
            include: {
                customer: {
                    select:  {
                        id: true, 
                        name: true,
                    }
                }
            },
            orderBy: [
                orderByMap[filter.sortBy ?? "customerName"],
                {
                    id: "asc",
                }
            ],
            ...(filter.cursor && {
                cursor: {
                    id: filter.cursor,
                },
                skip: 1
            }),
            take: filter.limit + 1,
        });

        // console.log(dataPaginated);

        return buildPaginatedResponse(dataPaginated, filter.limit, filter.cursor);
    }

    public async getContractById(db: DbClient, id: string): Promise<ContractWithCustomer | null> {
        return db.contract.findUnique({
            where: {
                id,
            },
            include: {
                customer: {
                    select:  {
                        id: true, 
                        name: true,
                    }
                }
            },
        })
    }

    public async createContract(db: DbClient, data: CreateContractBody): Promise<ContractWithCustomer> {
        return db.contract.create({
            data,
            include: {
                customer: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        })
    }
    
    public async updateContract(db: DbClient, id: string, data: Partial<UpdateContractBody>): Promise<ContractWithCustomer> {
        return db.contract.update({
            where: {
                id,
            },
            include:  {
                customer: {
                    select: {
                        id: true, 
                        name: true,
                    }
                }
            },
            data
        })
    }

    public async deleteContract(db: DbClient, id: string): Promise<void> {
        await db.contract.delete({
            where: {
                id,
            }
        });
    }

    public async deleteManyContracts(db: DbClient, ids: string[]): Promise<number> {
        const result = await db.contract.deleteMany({
            where: {
                id: {
                    in: ids,
                }
            }
        })

        return result.count;
    }

}
