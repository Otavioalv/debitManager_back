import z from "zod";
import { createContractBodySchema, listContractsQuerySchema } from "./contracts.schema";
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


export type CreateContractBody = z.infer<typeof createContractBodySchema>;
export type CreateContractInputBody = z.input<typeof createContractBodySchema>;

