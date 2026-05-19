import { z } from "zod";

export const listCustomersQuerySchema = z.object({
    name: z
        .preprocess(
            (v) => (typeof v === "string" && v.trim() === "" ? undefined : v), 
            z
            .string("Compo precisa conter caracteres validos")
            .trim()
            .min(1, "No minimo um caracter")
            .max(100, "No maximo 100 caracteres")
            .optional(),
        ),
    sortBy: z
        .preprocess(
            (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
            z.enum([
                "name",
                "balance",
                // "createdAt",
            ], "Valor escolhido invalido")
            .optional()
            .default("name")
        ),

    // cursor pagination (criar schema expecifico para filtros)
    cursor: z
        .preprocess(
            (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
            z
            .uuid("Parametro invalido")
            .optional(),
        ),
    limit: z
        .preprocess(
            (v) => (v === undefined || v === "" ? undefined : Number(v)),
            z
            .number()
            .int()
            .min(1, "Tem que ser maior que 1")
            .max(100, "Tem que ser menor que 100")
            .optional()
            .default(2),
        ),
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
        .transform(
            (v) => BigInt(v),
        ),
});

export const updateCustomerBodySchema = createCustomerBodySchema.partial();
