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

        /* 
        [`${sortBy}_id`]: {
            [sortBy]:
                sortBy === "balance"
                    ? BigInt(filter.cursor.value)
                    : filter.cursor.value,

            id: filter.cursor.id,
        },
        */

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
            cursor: {
                // id: filter.cursor ?? undefined,
                ["phoneNumber"]: filter.cursor ?? undefined
            },
            take: filter.limit ? filter.limit + 1 : undefined, 
        });

        // console.log(dataPaginated);

        // const normalizedCustomers = isBackward
        //     ? customers.reverse()
        //     : customers;

        // console.log("normalized repository: ", customers);

        return buildPaginatedResponse(dataPaginated, filter.limit, filter.cursor);
        // const [customers, pagination] = dataPaginated;

        // return {
        //     data: dataPaginated,
        //     pagination: {
        //         cursor: "",
        //         hasNextPage: false,
        //         hasPreviousPage: false,
        //         limit: filter.limit ?? 10,
        //         startCursor: "",
        //         endCursor: "",
        //     }
        // }
    }
}
