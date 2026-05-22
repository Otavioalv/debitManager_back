import { ApiResponse } from "@/shared/http/ApiResponse";
import { NextFunction, Response } from "express";


export const validateQuery = (
    req: Request,
    res: Response<ApiResponse>,
    next: NextFunction
) => {
    

    return next();
};
