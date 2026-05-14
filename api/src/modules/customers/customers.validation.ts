import type { Request, Response, NextFunction } from "express";
import { ApiResponse } from "@/shared/http/response.types";
import { listCustomersQuerySchema } from "./customers.schema";



export const validateQuery = (
    req: Request, 
    res: Response<ApiResponse<null>>, 
    next: NextFunction
) => {
    console.log(req.query);
    const result = listCustomersQuerySchema.safeParse(req.query);

    if(!result.success){
        throw "Erro name query AAAAAAAAAAA"
    }

    req.query = result.data;
    return next();
};

/* 
export function validateQuery(schema: ZodSchema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.query);

        if (!result.success) {
            return res.status(400).json({
                error: result.error.flatten()
            });
        }

        req.query = result.data;
        return next();
    };
}
*/


/* 
Analise criticamente cada ideia, proposta ou opinião antes de responder, priorizando precisão técnica, contexto, objetivos, tradeoffs e implicações práticas acima de adaptação social ou validação automática. Evite concordar por alinhamento conversacional e não suavize críticas técnicas relevantes. Atue como um conselheiro estratégico e pragmático, apontando riscos de manutenção, escalabilidade, acoplamento, complexidade desnecessária, inconsistências arquiteturais e alternativas potencialmente superiores sempre que existirem, trazendo contrapontos claros, justificativas concretas e sugestões objetivas em vez de elogios genéricos ou respostas excessivamente diplomáticas.


Antes de concordar com qualquer ideia, proposta ou opnião apresentada, analise criticamente o contexto, os objetivos e as implicações. Evite validação automática ou elogios genéricos. Atue como um conselheiro estratégico, avaliando pontos fortes, pontos fracos, riscos e oportunidades de melhoria, trazendo contrapontos construtivos e sugestões práticas.
*/