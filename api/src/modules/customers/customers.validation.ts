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

    console.log(res.locals.validated);
    
    return next();
};


