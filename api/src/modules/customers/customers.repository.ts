import { Customer, PrismaClient } from "@generated/prisma/client";
import { FilterListCustomerParams } from "./customers.type";


export class CustomersRepository {
    constructor(
        private prisma: PrismaClient
    ) {}

    public async listCustomers(filter:FilterListCustomerParams): Promise<Customer[]>{

        return await this.prisma.customer.findMany({
            where: {
                ...(filter.name && {
                    name: {
                        contains: filter.name,
                        mode: "insensitive",
                    }
                }),
            },
            orderBy: {
                [filter.sortBy ?? "name"]: "asc",
            }
        });
    }
}
