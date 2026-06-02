import z from "zod"
import { paginationSchema } from "./pagination.schema";


export interface CreateListQuerySchemaParams<T extends readonly [string, ...string[]]> {
    sortOptions: T;
    defaultSort: T[number];
}



export function createListQuerySchema<T extends readonly [string, ...string[]]>({
    sortOptions,
    defaultSort,
}: CreateListQuerySchemaParams<T>) {
    return z.object({
        search: z
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
                z.enum(sortOptions, "Valor escolhido invalido")
                .optional()
                .default(defaultSort)
            ),
        order: z
            .preprocess(
                (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
                z
                .enum([
                    "asc",
                    "desc",
                ])
                .default("asc"),
            )
    }).extend(paginationSchema.shape);
}
