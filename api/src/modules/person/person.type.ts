import z from "zod";
import { 
    createPersonBodySchema, 
    personParamsSchema, 
    listPersonQuerySchema, 
    updatePersonBodySchema,
} from "./person.schema";
import { Prisma } from "@generated/prisma/client";

// 
export interface person {
    id: string,
    name: string,
    phoneNumber: string,
    balance: number,
    createdAt: Date,
    updatedAt: Date,
}

export type FilterListPersonParams = z.infer<typeof listPersonQuerySchema>;
export type PersonParams = z.infer<typeof personParamsSchema>;

// tipos de entrada 
export type CreatePersonBody = z.infer<typeof createPersonBodySchema>;
export type UpdatePersonBody = z.infer<typeof updatePersonBodySchema>;

// tipos usados para inserção de dados em teste
export type CreatePersonInputBody = z.input<typeof createPersonBodySchema>;
// Criar um update person input body

// tipos para salvar no banco de dados (fazer abaixo)
export type PersonCreateParams = Pick<Prisma.PersonCreateInput, 
    "name"
    | "phoneNumber"
    | "secondaryPhoneNumber"
    | "cpf"
    | "cnpj"
    | "rg"
    | "cnh"
    | "stateRegistration"
    | "municipalRegistration"
>

// mudar isso se update limitar a quantidade de campos para atualizar.
export type PersonUpdateParams = Partial<PersonCreateParams>;

