import { Prisma } from "@generated/prisma/client";
import { prisma } from "./prisma";

export type ExtendedPrismaClient = typeof prisma;

export type DbClient =
    | ExtendedPrismaClient
    | Prisma.TransactionClient;
    