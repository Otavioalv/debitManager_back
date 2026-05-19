import type { Request, Response, NextFunction } from "express";
import { createCustomerBodySchema, customerParamsSchema, listCustomersQuerySchema } from "./customers.schema";
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


export const validateParams = (
    req: Request, 
    res: Response<ApiResponse>, 
    next: NextFunction
) => {
    const result = customerParamsSchema.safeParse(req.params);

    if(!result.success){
        return ApiResponse.error(res, {
            code: "ERROR_PARAMS",
            message: "Erro com parametros da rota",
            statusCode: 400,
            details: {
                zod: z.treeifyError(result.error)
            }
        });
    }

    res.locals.validated.params = result.data;

    return next();
}


export const validateBody = (schema: z.ZodTypeAny) => {
    return (
        req: Request,
        res: Response<ApiResponse>,
        next: NextFunction,
    ) => {
        const result = schema.safeParse(req.body);

        if(!result.success) {
            return ApiResponse.error(
                res,
                {
                    code: "ERROR_BODY",
                    message:"Invalid request body",
                    statusCode:400,
                    details: {
                        zod:z.treeifyError(result.error),
                    },
                }
            );
        }

        res.locals.validated.body = result.data;

        return next();
    };
};

