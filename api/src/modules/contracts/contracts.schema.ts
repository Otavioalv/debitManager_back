import { createListQuerySchema } from "@/shared/schemas/pagination/listing.schema";
import { InstallmentFrequency, InterestPeriod } from "@generated/prisma/enums";
import z from "zod";


export const listContractsQuerySchema = createListQuerySchema({
    sortOptions: ["customerName", "startDate", "title"] as const,
    defaultSort: "customerName",
});


export  const contractParamsSchema = z.object({
    id: z.uuid("Parametro invalido"),
});

export const createContractBodySchema = z.object({
    title: z
        .string("Campo precisa conter caracteres validos")
        .trim()
        .min(1, "No minimo um caracter")
        .max(500, "No maximo 500 caracteres"),
    description: z
        .string("Campo precisa conter caracteres validos")
        .trim()
        .optional(),
    customerId: z.uuid("Campo precisa conter um UUID valido"),
    totalAmount: z
        .string("Campo precisa conter caracteres validos")
        .regex(/^\d+$/, "Campo deve conter apenas numeros positivos inteiros representando centavos"),
    installmentCount: z
        .number("Campo precisa conter um numero valido")
        .int("Campo deve ser um numero inteiro")
        .positive("Campo deve ser um numero positivo"),
    installmentFrequency: z
        .enum(InstallmentFrequency, "Valor escolhido invalido"),
    interestRate: z
        .string("Campo precisa conter caracteres validos")
        .regex(/^\d+(\.\d{1,2})?$/, "Campo deve ser um numero positivo representando a porcentagem de juros")
        .transform(v => v ? parseFloat(v) : 0),
    interestPeriod: z
        .enum(InterestPeriod, "Valor escolhido invalido"),
   startDate: z
        .iso.datetime()
        .transform(v => new Date(v)),
    skipSaturday: z
        .boolean("Campo precisa conter um valor booleano")
        .default(false),
    skipSunday: z
        .boolean("Campo precisa conter um valor booleano")
        .default(false), 
});


export const updateContractBodySchema = createContractBodySchema.partial();

export const deleteManyContractsBodySchema = z.object({
    ids: z
        .array(z.uuid("Parametro invalido"))
        .min(1, "No minimo um item")
        .max(100, "No maximo 100 itens")
        .refine((arr) => 
            new Set(arr).size  === arr.length,
            "Itens duplicados não são permitidos"
        ),
});

// export const contractDetailsResponseSchema = z.object({
//     id: z.string(),
//     title: z.string(),
//     description: z.string().nullable(),
//     customer: z.object({
//         id: z.string(),
//         name: z.string(),
//     }),
//     totalAmount: z.string(),
//     installmentCount: z.number(),
//     installmentFrequency: z.enum(InstallmentFrequency),
//     interestRate: z.string(),
//     interestPeriod: z.enum(InterestPeriod),
//     startDate: z.string(),
//     skipSaturday: z.boolean(),
//     skipSunday: z.boolean(),
//     status: z.enum(ContractStatus),
//     createdAt: z.string(),
//     updatedAt:z.string(),
// });


