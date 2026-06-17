import z from "zod"
import { paginationSchema } from "./pagination.schema";


// export interface CreateListQuerySchemaParams<
//     TSort extends readonly [string, ...string[]],
//     TFilter extends readonly [string, ...string[]]
// > {
//     sortOptions: TSort,
//     defaultSort: TSort[number],
//     filterOptions?: TFilter,
//     defaultFilter?: TFilter[number],
// }

// separar em tipos e interfaces
export type CreateListQuerySchemaParams<
    TSort extends readonly [string, ...string[]],
    TFilter extends readonly [string, ...string[]]
> = 
    | {
        sortOptions: TSort,
        defaultSort: TSort[number],
    }
    | {
        sortOptions: TSort,
        defaultSort: TSort[number],
        filterOptions: TFilter,
        defaultFilter: TFilter[number],
    }


export function createListQuerySchema<
    TSort extends readonly [string, ...string[]],
    TFilter extends readonly [string, ...string[]]
>(
    params: CreateListQuerySchemaParams<TSort, TFilter>
) {

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
                z.enum(params.sortOptions, "Valor escolhido invalido")
                .optional()
                .default(params.defaultSort)
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

    if("filterOptions" in params){
        return schemaWithPagination.extend({
            filter: z
                .preprocess(
                    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
                    z
                    .enum(params.filterOptions, "Valor escolhido invalido")
                    .optional()
                    .default(params.defaultFilter)
                )
        });   
    }

    return schemaWithPagination;
}
