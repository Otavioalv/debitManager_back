import { ApiResponse } from "@/shared/http/ApiResponse";
import { NextFunction, Request, Response } from "express";
import { contractParamsSchema, listContractsQuerySchema } from "./contracts.schema";
import z from "zod";


export const validateQuery = (
    req: Request,
    res: Response<ApiResponse>,
    next: NextFunction
) => {
    const result = listContractsQuerySchema.safeParse(req.query);

    if(!result.success){
        return ApiResponse.error(res, {
            code: "ERROR_FILTER_PARAMS",
            message: "Erro com parametros do filtro",
            statusCode: 400,
            details: {
                zod: z.treeifyError(result.error)
            }
        })
    }

    res.locals.validated.query = result.data;

    // console.log("[VALIDATED QUERY - contracts.validation]: ", res.locals.validated.query);

    return next();
};

export const validateParams = (
    req: Request,
    res: Response<ApiResponse>,
    next: NextFunction
) => {
    const result = contractParamsSchema.safeParse(req.params);

    if(!result.success){
        return ApiResponse.error(res, {
            code: "ERROR_PARAMS",
            message: "Erro com parametros da rota",
            statusCode: 400,
            details: {
                zod: z.treeifyError(result.error)
            }
        })
    }

    res.locals.validated.params = result.data;

    // console.log("[VALIDATED PARAMS - contracts.validation]: ", res.locals.validated.params);

    return next();
}
