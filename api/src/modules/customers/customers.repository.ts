import { Customer } from "@generated/prisma/client";
import { CreateCustomerBody, FilterListCustomerParams, UpdateCustomerBody } from "./customers.type";
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

    public async getCustomerById(id: string): Promise<Customer | null> {
        return this.prisma.customer.findUnique({
            where: {
                id,
            },
        });
    }

    public async createCustomer(data: CreateCustomerBody): Promise<Customer> {
        return this.prisma.customer.create({
            data
        });
    }

    public async updateCustomer(id: string, data: UpdateCustomerBody): Promise<Customer> {
        return this.prisma.customer.update({
            where: {
                id,
            },
            data: {
                ...(data.name !== undefined && { 
                    name: data.name 
                }),
                ...(data.phoneNumber !== undefined && { 
                    phoneNumber: data.phoneNumber 
                }),
                ...(data.balance !== undefined && { 
                    balance: data.balance 
                }),
            },
        });
    }

    public async deleteCustomer(id: string): Promise<void> {
        await this.prisma.customer.delete({
            where: {
                id,
            },
        });
    }
}
