import { Customer, PrismaClient } from "@generated/prisma/client";
import { FilterListCustomerParams } from "./customers.type";
import {DataWithPagination} from "./customers.dto";
import { Pagination } from "@/shared/http/response.types";
import { buildPaginatedResponse } from "@/shared/utils/pagination.utils";


export class CustomersRepository {
    constructor(
        private prisma: PrismaClient
    ) {}

    public async listCustomers(filter:FilterListCustomerParams): Promise<DataWithPagination<Customer[]>>{

        /* 
        pagination
        cursor
        nextCursor
        previousCursor
        hasNextPage
        limit
        
        return {
            customers: items,
            pagination,
        };
        
        */
        const customers:Customer[] = await this.prisma.customer.findMany({
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
            take: filter.limit + 1,

            ...(filter.cursor && {
                cursor: {
                    id: filter.cursor
                },

                skip: 1,
            }),
        });

        return buildPaginatedResponse(customers, filter.limit, filter.cursor);
    }
}
