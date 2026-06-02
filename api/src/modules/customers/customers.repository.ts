import { Customer, Prisma } from "@generated/prisma/client";
import { CreateCustomerBody, FilterListCustomerParams, UpdateCustomerBody } from "./customers.type";
import { DbClient, ExtendedPrismaClient } from "@/shared/database/database.types";
import { buildPaginatedResponse } from "@/shared/utils/pagination.utils";
import { DataWithPagination } from "@/shared/http/response.types";
import { OrderByMap } from "@/shared/types";


export class CustomersRepository {

    public async listCustomers(db: DbClient, filter:FilterListCustomerParams): Promise<DataWithPagination<Customer[]>>{

        const orderByMap: OrderByMap<
            FilterListCustomerParams["sortBy"],
            Prisma.CustomerOrderByWithRelationInput
        > = {
            name: {
                name: filter.order,
            },
            balance: {
                balance: filter.order,
            },
        }

        const dataPaginated = await db.customer.findMany({
            where: {
                ...(filter.search && {
                    name: {
                        contains: filter.search,
                        mode: "insensitive",
                    }
                }),
            },
            ...(filter.cursor && {
                cursor: {
                    id: filter.cursor,
                },
                skip: 1,
            }),
            orderBy: [
                orderByMap[filter.sortBy ?? "name"],
                {
                    id: "asc",
                }
            ],
            take: filter.limit + 1, 
        });

        return buildPaginatedResponse(dataPaginated, filter.limit, filter.cursor);
    }

    public async getCustomerById(db: DbClient, id: string): Promise<Customer | null> {
        return db.customer.findUnique({
            where: {
                id,
            },
        });
    }

    public async createCustomer(db: DbClient, data: CreateCustomerBody): Promise<Customer> {
        return db.customer.create({
            data
        });
    }

    public async updateCustomer(db: DbClient, id: string, data: UpdateCustomerBody): Promise<Customer> {
        return db.customer.update({
            where: {
                id,
            },
            data
        });
    }

    public async deleteCustomer(db: DbClient, id: string): Promise<void> {
        await db.customer.delete({
            where: {
                id,
            },
        });
    }

    public async deleteManyCustomers(db: DbClient, ids: string[]): Promise<number> {
        const result = await db.customer.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            }
        });

        return result.count;
    }

    // public async countCustomers(): Promise<number>
}
