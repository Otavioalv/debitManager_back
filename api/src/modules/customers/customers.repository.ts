import { Customer, PrismaClient } from "@generated/prisma/client";


export class CustomersRepository {
    constructor(
        private prisma: PrismaClient
    ) {}

    public async listCustomers(): Promise<Customer[]>{
        return await this.prisma.customer.findMany({
            orderBy: {
                name: "asc"
            }
        });
    }
}
