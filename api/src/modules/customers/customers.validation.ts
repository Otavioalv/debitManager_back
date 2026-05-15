import type { Request, Response, NextFunction } from "express";
import { listCustomersQuerySchema } from "./customers.schema";
import { ApiResponse } from "@/shared/http/ApiResponse";
import z from "zod";


export const validateQuery = (
    req: Request, 
    res: Response<ApiResponse>, 
    next: NextFunction
) => {
    const result = listCustomersQuerySchema.safeParse(req.query);

    if(!result.success){
        return ApiResponse.error(res, {
            code: "ERROR_FILTER_PARAMS",
            message: "Erro com parametros do filtro",
            statusCode: 400,
            details: {
                zod: z.treeifyError(result.error)
            }
        });
    }

    res.locals.validated.query = result.data;

    // console.log(res.locals.validated);
    
    return next();
};



/* 
Analise criticamente cada ideia, proposta ou opinião antes de responder, priorizando precisão técnica, contexto, objetivos, tradeoffs e implicações práticas acima de adaptação social ou validação automática. Evite concordar por alinhamento conversacional e não suavize críticas técnicas relevantes. Atue como um conselheiro estratégico e pragmático, apontando riscos de manutenção, escalabilidade, acoplamento, complexidade desnecessária, inconsistências arquiteturais e alternativas potencialmente superiores sempre que existirem, trazendo contrapontos claros, justificativas concretas e sugestões objetivas em vez de elogios genéricos ou respostas excessivamente diplomáticas.


Antes de concordar com qualquer ideia, proposta ou opnião apresentada, analise criticamente o contexto, os objetivos e as implicações. Evite validação automática ou elogios genéricos. Atue como um conselheiro estratégico, avaliando pontos fortes, pontos fracos, riscos e oportunidades de melhoria, trazendo contrapontos construtivos e sugestões práticas.
*/