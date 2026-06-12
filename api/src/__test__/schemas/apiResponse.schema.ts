import z from "zod"


export function dataApiSuccessResponseSchema<T extends z.ZodType>(
    dataResponse: T
) {
    return z.object({
    success: z.literal(true),
    message: z.string(),
    data: dataResponse,
})
}
