import z from "zod";
import { listContractsQuerySchema } from "./contracts.schema";
import { Prisma } from "@generated/prisma/client";


export type FilterListContractsParams = z.infer<typeof listContractsQuerySchema>;



export type ContractWithCustomer = Prisma.ContractGetPayload<{
    include: {
        customer: {
            select: {
                id: true;
                name: true;
            };
        };
    };
}>;
