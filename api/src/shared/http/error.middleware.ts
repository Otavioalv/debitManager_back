import { Request, Response, NextFunction } from "express";

import { AppError } from "./AppError";
import { ApiResponse } from "./ApiResponse";


// Definir tipo do retorno
export function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
){
    console.error("[API RESPONSE]: ", err);

    if(err instanceof AppError) {
        return ApiResponse.error(res, {
            statusCode: err.statusCode,
            message: err.message,
            code: err.code,
            details: err.details
        });
    }

    return ApiResponse.error(res, {
        statusCode: 500,
        message: "Internal server error",
        code: "INTERNAL_SERVER_ERROR"
    });
}
