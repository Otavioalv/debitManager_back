import z from "zod"
import { paginationSchema } from "./pagination.schema";


// separar em tipos e interfaces
export interface CreateListQuerySchemaParams<
    TSort extends readonly [string, ...string[]],
    TFilter extends readonly [string, ...string[]]
> {
    sortOptions: TSort,
    defaultSort: TSort[number],
    filterOptions?: TFilter,
    defaultFilter?: TFilter[number],
}

// export type CreateListQuerySchemaParams<
//     TSort extends readonly [string, ...string[]],
//     TFilter extends readonly [string, ...string[]]
// > = 
//     | {
//         sortOptions: TSort,
//         defaultSort: TSort[number],
//     }
//     | {
//         sortOptions: TSort,
//         defaultSort: TSort[number],
//         filterOptions: TFilter,
//         defaultFilter: TFilter[number],
//     }


export function createListQuerySchema<
    TSort extends readonly [string, ...string[]],
    TFilter extends readonly [string, ...string[]]
>({
    defaultSort,
    sortOptions,
    defaultFilter,
    filterOptions,
}: CreateListQuerySchemaParams<TSort, TFilter>) {

    const filterSchema =
        filterOptions && defaultFilter
            ? z
                .preprocess(
                    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
                    z
                    .enum(filterOptions, "Valor escolhido invalido")
                    .optional()
                    .default(defaultFilter)
                )
            : z.string().optional();

    const schemaWithPagination = z.object({
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
            ),
        filter: filterSchema,
    }).extend(paginationSchema.shape);

    return schemaWithPagination;
}
