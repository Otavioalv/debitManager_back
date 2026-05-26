import { z } from "zod";

export const contractDataResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z
        .string()
        .nullable(),
    customer: z
        .object({
            id: z.string(),
            name: z.string(),
        }),

    totalAmount: z.string(),
    installmentCount: z.number(),
    installmentFrequency: z.string(),
    interestRate: z.string(),
    interestPeriod: z.string(),
    startDate: z.string(),
    skipSaturday: z.boolean(),
    skipSunday: z.boolean(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const contractDataApiResponseSchema = z.object({
    success: z.literal(true),
    message: z.string(),
    data: contractDataResponseSchema,
});

// export const contractListResponseSchema = 

/* 
t(res.body).toMatchObject({
    success: true,
    message: expect.any(String),
    data: {
        data: expect.any(Array),
        pagination: expect.any(Object),
    },
    meta: null,
    error: null,
*/