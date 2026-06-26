import { createListQuerySchema } from "@/shared/schemas/pagination/listing.schema";


export const listInstallmentsQuerySchema = createListQuerySchema({
    sortOptions: ["dueAt"] as const, 
    defaultSort: "dueAt",
    filterOptions: ["all", "dueToday", "late"] as const,
    defaultFilter: "all"
});
