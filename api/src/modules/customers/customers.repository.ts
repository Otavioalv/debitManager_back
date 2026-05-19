import { Customer } from "@generated/prisma/client";
import { FilterListCustomerParams } from "./customers.type";
import {DataWithPagination} from "./customers.dto";
import { ExtendedPrismaClient } from "@/shared/database/prisma";
import { buildPaginatedResponse } from "@/shared/utils/pagination.utils";


export class CustomersRepository {
    constructor(
        private prisma: ExtendedPrismaClient
    ) {}

    
    public async listCustomers(filter:FilterListCustomerParams): Promise<DataWithPagination<Customer[]>>{
        const dataPaginated = await this.prisma.customer.findMany({
            where: {
                ...(filter.name && {
                    name: {
                        contains: filter.name,
                        mode: "insensitive",
                    }
                }),
            },
            orderBy: [
                {
                    [filter.sortBy ?? "name"]: "asc",
                },
                {
                    id: "asc",
                }
            ],
            ...(filter.cursor && {
                cursor: {
                    id: filter.cursor,
                },
                skip: 1,
            }),
            take: filter.limit + 1, 
        });

        return buildPaginatedResponse(dataPaginated, filter.limit, filter.cursor);
    }
}
