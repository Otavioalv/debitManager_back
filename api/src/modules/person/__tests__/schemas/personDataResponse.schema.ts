import { dataApiSuccessResponseSchema } from "@/__test__/schemas/apiResponse.schema";
import z from "zod";

/* 




secondaryPhoneNumber: string | null;
cpf: string | null;
cnpj: string | null;
rg: string | null;
cnh: string | null;
stateRegistration: string | null;
municipalRegistration: string | null;
*/

export const personDataResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    phoneNumber: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    secondaryPhoneNumber: z
        .string()
        .nullable(),
    cpf: z
        .string()
        .nullable(),
    cnpj: z
        .string()
        .nullable(),
    rg: z
        .string()
        .nullable(),
    cnh: z
        .string()
        .nullable(),
    stateRegistration: z
        .string()
        .nullable(),
    municipalRegistration: z
        .string()
        .nullable(),
});


export const dataSuccessResponseSchema = dataApiSuccessResponseSchema(personDataResponseSchema);

