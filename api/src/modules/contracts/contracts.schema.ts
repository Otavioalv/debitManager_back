import { paginationSchema } from "@/shared/schemas/pagination.schema";
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
