import { createListQuerySchema } from "@/shared/schemas/pagination/listing.schema";
import z from "zod";


// replicar em outros schemas, tornar isso global e reutilizavel
const optionalIsoDateTime = z.preprocess(
    value => value === "" ? undefined : value,
    z.iso.datetime().optional()
);

export const dateRangeQuerySchema = z
    .object({
        from: optionalIsoDateTime,
        to: optionalIsoDateTime,
    })
    .refine(
        ({from, to}) => !(to && !from),
        {
            error: "\"to\" cannot be used without \"from\"",
            path: ["to"],
        }
    )
    .refine(
        ({from, to}) => {
            if(!from || !to) return true;
            return new Date(from) <= new Date(to);
        },
        {
            message: "\"to\" must be after or equal to \"from\"",
            path: ["to"],
        }
    );


export const listInstallmentsQuerySchema = dateRangeQuerySchema.and(createListQuerySchema({
    sortOptions: ["dueAt"] as const, 
    defaultSort: "dueAt",
    filterOptions: ["all", "overdue"] as const,
    defaultFilter: "all",
}));


// upcoming: vao vencer (nao faz muito sentido)
// overdue: atrasadas

// inicion 12/05/2025 T00:00:01Z
// fim 12/06/2025 T00:00:01Z
