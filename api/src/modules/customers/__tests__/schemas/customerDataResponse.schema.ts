import z from "zod";

export const customerDataResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    balance: z.string(),
    phoneNumber: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});


