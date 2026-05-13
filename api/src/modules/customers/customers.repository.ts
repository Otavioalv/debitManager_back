import { PrismaClient } from "../../../generated/prisma/client";


export class CustomersRepository {
    constructor(
        private prisma: PrismaClient
    ) {}

    public async listCustomers() {
        return this.prisma.customer.findMany();
    }
}
