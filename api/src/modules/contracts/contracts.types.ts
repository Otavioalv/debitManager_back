import z from "zod";
import { createContractBodySchema, listContractsQuerySchema, updateContractBodySchema } from "./contracts.schema";
import { Contract, Prisma } from "@generated/prisma/client";


export type FilterListContractsParams = z.infer<typeof listContractsQuerySchema>;


// export type CreateContractBody = {
//     "personId"
//     | "title"
//     | "totalAmount"
//     | "installmentCount"
//     | "installmentFrequency"
//     | "interestRate"
//     | "interestPeriod"
//     | "timezone"
//     | "startAt"
//     | "skipSaturday"
//     | "skipSunday"
// }



export type ContractWithPerson = Prisma.ContractGetPayload<{
    include: {
        person: {
            select: {
                id: true;
                name: true;
            };
        };
    };
}>;


// tipos de entrada pelo json body
export type CreateContractBody = z.infer<typeof createContractBodySchema>;
export type UpdateContractBody = z.infer<typeof updateContractBodySchema>;

// 
export type CreateContractInputBody = z.input<typeof createContractBodySchema>;

// tipo para salvar no banco de dados
export type ContractCreateParams = Pick<Prisma.ContractCreateInput, 
    "person"
    | "title"
    | "totalAmount"
    | "installmentCount"
    | "installmentFrequency"
    | "interestRate"
    | "interestPeriod"
    | "timezone"
    | "startAt"
    | "skipSaturday"
    | "skipSunday"
    | "description"
>;

export type ContractUpdateParams = Partial<Pick<Prisma.ContractCreateInput, 
    "description"
    | "title"
    | "status"
>>;
