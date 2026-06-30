import { createListQuerySchema } from "@/shared/schemas/pagination/listing.schema";
import z from "zod";


export const dateRangeQuerySchema = z
    .object({
        from: z
            .iso.datetime()
            .optional(),
        to: z
            .iso.datetime()
            .optional(),
    })
    .refine(
        ({from, to}) => !(from && !to),
        {
            error: "\"from\" cannot be used without \"to\"",
            path: ["from"],
        }
    )
    .refine(
        ({from, to}) => {
            if(!from || !to) return true;
            return new Date(from) <= new Date(to);
        },
        {
            message: "\"from\" must be before or equal to \"to\"",
            path: ["from"],
        }
    );


export const listInstallmentsQuerySchema = createListQuerySchema({
    sortOptions: ["dueAt"] as const, 
    defaultSort: "dueAt",
    filterOptions: ["all", "overdue"] as const,
    defaultFilter: "all"
}).safeExtend(dateRangeQuerySchema.shape);


// upcoming: vao vencer (nao faz muito sentido)
// overdue: atrasadas

// inicion 12/05/2025 T00:00:01Z
// fim 12/06/2025 T00:00:01Z
