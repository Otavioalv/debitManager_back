import { Request, Response } from "express";
import { ApiResponse } from "../http/ApiResponse";
import { AppError } from "../http/AppError";

export const notFoundMiddleware = (
    req: Request,
    res: Response,
) => {
    throw new AppError(404, "NOT_FOUND_ROUTER", "The requested route does not exist.");
};
