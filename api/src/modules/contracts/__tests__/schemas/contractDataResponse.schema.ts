import { dataApiSuccessResponseSchema } from "@/__test__/schemas/apiResponse.schema";
import { z } from "zod";

export const contractDataResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z
        .string()
        .nullable(),
    person: z
        .object({
            id: z.string(),
            name: z.string(),
        }),

    totalAmount: z.string(),
    installmentCount: z.number(),
    installmentFrequency: z.string(),
    interestRate: z.string(),
    interestPeriod: z.string(),
    timezone: z.string(),
	startAt: z.string(),
    skipSaturday: z.boolean(),
    skipSunday: z.boolean(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const dataSuccessResponseSchema = dataApiSuccessResponseSchema(contractDataResponseSchema);
