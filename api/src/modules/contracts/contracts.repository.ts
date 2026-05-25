import { ExtendedPrismaClient } from "@/shared/database/prisma";
import { ContractWithCustomer, FilterListContractsParams } from "./contracts.types";
import { Prisma } from "@generated/prisma/client";
import { buildPaginatedResponse } from "@/shared/utils/pagination.utils";
import { DataWithPagination } from "@/shared/http/response.types";
import { OrderByMap } from "@/shared/types";


export class ContractsRepository {
    constructor (
        private prisma: ExtendedPrismaClient
    ){}

    public async listContracts(filter: FilterListContractsParams):Promise<DataWithPagination<ContractWithCustomer[]>> {

        // Separar o tipo, para arquivo types no mesmo modulo
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


        const dataPaginated = await this.prisma.contract.findMany({
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
}