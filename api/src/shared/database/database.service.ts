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
        return this.prisma.$transaction(callback, {
            // para bd com poolers baixo, definir tempo corretamente
            // Definir com extremo cuidado, de acordo com uso e config do bd
            maxWait: 10000, // tempo de espera ao receber uma chamado ao bd
            timeout: 15000  // Tempo maximo que transaction deve ficar aberta
        });
    }
}
