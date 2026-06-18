import { createListQuerySchema } from "@/shared/schemas/pagination/listing.schema";


export const listInstallmentsQuerySchema = createListQuerySchema({
    sortOptions: ["dueDate"] as const, 
    defaultSort: "dueDate",
    filterOptions: ["all", "dueToday", "late"] as const,
    defaultFilter: "all"
});
