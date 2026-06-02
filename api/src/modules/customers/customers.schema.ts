import { createListQuerySchema } from "@/shared/schemas/pagination/listing.schema";
import { z } from "zod";


export const listCustomersQuerySchema = createListQuerySchema({
    sortOptions: ["name", "balance"] as const,
    defaultSort: "name",
});


export const customerParamsSchema = z.object({
    id: z.uuid("Parametro invalido"),
});


export const createCustomerBodySchema = z.object({
    name: z
        .string("Campo precisa conter caracteres validos")
        .trim()
        .min(1, "No minimo um caracter")
        .max(500, "No maximo 500 caracteres"),

    phoneNumber: z
        .string("Campo precisa conter caracteres validos")
        .trim(),

    balance: z
        .string("Campo precisa conter caracteres validos")
        .regex(
            /^\d+$/,
            "Campo deve conter apenas numeros positivos inteiros representando centavos",
        )
});

export const updateCustomerBodySchema = createCustomerBodySchema.partial();

export const deleteManyCustomersBodySchema = z.object({
    ids: z
        .array(z.uuid("Parametro invalido"))
        .min(1, "No minimo um item")
        .max(100, "No maximo 100 itens")
        .refine((arr) => 
            new Set(arr).size  === arr.length,
            "Itens duplicados não são permitidos"
        ),
})
