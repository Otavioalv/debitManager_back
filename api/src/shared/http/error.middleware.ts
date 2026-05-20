import { Request, Response, NextFunction } from "express";

import { AppError } from "./AppError";
import { ApiResponse } from "./ApiResponse";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";



// Define tipes to return
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

    // Handle known Prisma errors and convert them to appropriate API responses
    if(err instanceof PrismaClientKnownRequestError) {
        switch(err.code) {
            case "P2025":
                return ApiResponse.error(
                    res,
                    {
                        statusCode: 404,
                        code: "RESOURCE_NOT_FOUND",
                        message:"Resource not found",
                    }
                );
            case "P2002":
                return ApiResponse.error(
                    res,
                    {
                        statusCode: 409,
                        code:"UNIQUE_CONSTRAINT",
                        message:"Resource already exists",
                    }
                );
        }
    }

    return ApiResponse.error(res, {
        statusCode: 500,
        message: "Internal server error",
        code: "INTERNAL_SERVER_ERROR"
    });
}
