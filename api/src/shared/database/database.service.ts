import { Prisma } from "@generated/prisma/client";
import { ExtendedPrismaClient } from "./database.types";

export class DatabaseService {
    constructor(
        private prisma:ExtendedPrismaClient,
    ){}

    get client(): ExtendedPrismaClient {
        return this.prisma;
    }

    async transaction<T>(
        callback: (tx: Prisma.TransactionClient) => Promise<T>
    ): Promise<T> {
        return this.prisma.$transaction(callback);
    }
}
