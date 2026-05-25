import { paginationSchema } from "@/shared/schemas/pagination.schema";
import { InstallmentFrequency, InterestPeriod } from "@generated/prisma/enums";
import z from "zod";


export const listContractsQuerySchema = z.object({
    // mudar para tipo unico
    search: z
        .preprocess(
            (v) => typeof v === "string" && v.trim() === "" ? undefined : v,
            z
            .string("Campo precisa conter caracteres validos")
            .trim()
            .min(1, "No minimo um caracter")
            .max(300, "No maximo 300 caracteres")
            .optional(),
        ),
    sortBy: z
        .preprocess(
            (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
            z.enum([
                "customerName",
                "startDate",
                "title",
            ], "Valor escolhido invalido")
            .optional()
            .default("customerName")
        )

}).extend(paginationSchema.shape);

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
        .regex(/^\d+$/, "Campo deve conter apenas numeros positivos inteiros representando centavos")
        .transform(v => BigInt(v)),
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
        .string("Campo precisa conter caracteres validos")
        .refine(
            (v) => !isNaN(Date.parse(v)),
            "Campo deve ser uma data válida no formato ISO 8601"
        )
        .transform(v => new Date(v)),
    skipSaturday: z
        .boolean("Campo precisa conter um valor booleano")
        .default(false),
    skipSunday: z
        .boolean("Campo precisa conter um valor booleano")
        .default(false), 
});
