import z from "zod";


export const paginationSchema = z.object({
    // cursor pagination (criar schema expecifico para filtros)
    cursor: z
        .preprocess(
            (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
            z
            .uuid("Parametro invalido")
            .optional(),
        ),
    limit: z
        .preprocess(
            (v) => (v === undefined || v === "" ? undefined : Number(v)),
            z
            .number("Insira um valor numerico inteiro")
            .int()
            .min(1, "Tem que ser maior que 1")
            .max(100, "Tem que ser menor que 100")
            .optional()
            .default(2),
        ),
});
