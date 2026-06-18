import { createListQuerySchema } from "@/shared/schemas/pagination/listing.schema";
import { z } from "zod";


export const listPersonQuerySchema = createListQuerySchema({
    sortOptions: ["name",/*  "balance" */] as const,
    defaultSort: "name",
});


export const personParamsSchema = z.object({
    id: z.uuid("Parametro invalido"),
});

export const createPersonBodySchema = z.object({
    name: z
        .string("Campo precisa conter caracteres validos")
        .trim()
        .min(1, "No minimo um caracter")
        .max(500, "No maximo 500 caracteres"),
    phoneNumber: z
        .string("Campo precisa conter caracteres validos")
        .trim(),
    secondaryPhoneNumber: z
        .string("Campo precisa conter caracteres validos")
        .trim()
        .optional(),
    cpf: z
        .string("Campo precisa conter caracteres validos")
        .trim()
        .optional(),  
    cnpj: z
        .string("Campo precisa conter caracteres validos")
        .trim()
        .optional(),  
    rg: z
        .string("Campo precisa conter caracteres validos")
        .trim()
        .optional(),  
    cnh: z
        .string("Campo precisa conter caracteres validos")
        .trim()
        .optional(),  
    stateRegistration: z
        .string("Campo precisa conter caracteres validos")
        .trim()
        .optional(),  
    municipalRegistration: z
        .string("Campo precisa conter caracteres validos")
        .trim()
        .optional(),
    // balance: z
    //     .string("Campo precisa conter caracteres validos")
    //     .regex(
    //         /^\d+$/,
    //         "Campo deve conter apenas numeros positivos inteiros representando centavos",
    //     )
});

export const updatePersonBodySchema = createPersonBodySchema.partial();

export const deleteManyPersonBodySchema = z.object({
    ids: z
        .array(z.uuid("Parametro invalido"))
        .min(1, "No minimo um item")
        .max(100, "No maximo 100 itens")
        .refine((arr) => 
            new Set(arr).size  === arr.length,
            "Itens duplicados não são permitidos"
        ),
})
