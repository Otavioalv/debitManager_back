import { ApiResponse } from "@/shared/http/ApiResponse";
import { NextFunction, Request, Response } from "express";
import { listContractsQuerySchema } from "./contracts.schema";
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

    console.log("[VALIDATED QUERY - contracts.validation]: ", res.locals.validated.query);

    return next();
};
