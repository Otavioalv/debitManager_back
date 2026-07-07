import { createListQuerySchema } from "@/shared/schemas/pagination/listing.schema";
import z from "zod";


// replicar em outros schemas, tornar isso global e reutilizavel
const optionalIsoDateTime = z.preprocess(
    value => value === "" ? undefined : value,
    z.iso.datetime().optional()
);


// Talvez mesclar com installmentFiltersQuerySchema
export const dateRangeQuerySchema = z
    .object({
        from: optionalIsoDateTime,
        to: optionalIsoDateTime,
    })
    .refine(({from, to}) => !(to && !from),{
        error: "\"to\" cannot be used without \"from\"",
        path: ["to"],
    })
    .refine(({from, to}) => {
        if(!from || !to) return true;
        return new Date(from) <= new Date(to);
    },{
        message: "\"to\" must be after or equal to \"from\"",
        path: ["to"],
    })
    .refine(({ from, to }) => {
        if(!from || !to) return true;
        const start = new Date(from);
        const max = new Date(start);

        max.setMonth(max.getMonth() + 3);

        return new Date(to) <= max;
    },{
        error: "The maximum allowed date range is 3 months",
        path: ["to"],
    });


export const installmentFiltersQuerySchema = z.object({
    contractId: z
        .preprocess(
            (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
            z
            .uuid("Parametro invalido")
            .optional(),
        ),
    // personId
    // status
    // minAmount
    // maxAmount
    // dueAfter
    // dueBefore
});

export const listInstallmentsQuerySchema = 
    installmentFiltersQuerySchema.and(
        dateRangeQuerySchema.and(
            createListQuerySchema({
                sortOptions: ["dueAt", "installmentNumber"] as const, 
                defaultSort: "dueAt",
                
                filterOptions: ["all", "overdue"] as const,
                defaultFilter: "all",
            })
        )
    );
    

// upcoming: vao vencer (nao faz muito sentido)
// overdue: atrasadas

// inicion 12/05/2025 T00:00:01Z
// fim 12/06/2025 T00:00:01Z

// Status da parcela: pendente, parcial, paga, vencida
// enum InstallmentStatus {
//   PENDING
//   PARTIAL
//   PAID
//   OVERDUE
// }

export  const installmentParamsSchema = z.object({
    id: z.uuid("Parametro invalido"),
});

