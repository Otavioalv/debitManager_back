import { z } from "zod";

export const listCustomersQuerySchema = z.object({
    name: z
        .preprocess(
            (v) => (typeof v === "string" && v.trim() === "" ? undefined : v), 
            z
            .string("Compo precisa conter caracteres validos")
            .trim()
            .min(1, "No minimo um caracter")
            .max(100, "No maximo 100 caracteres")
            .optional(),
        )
});

