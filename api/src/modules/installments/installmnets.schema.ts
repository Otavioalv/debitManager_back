import { createListQuerySchema } from "@/shared/schemas/pagination/listing.schema";


export const listInstallmentsQuerySchema = createListQuerySchema({
    sortOptions: ["dueDate", "dueToday", "late"] as const, 
    defaultSort: "dueDate"
});
