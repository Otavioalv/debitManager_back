import { Request, Response } from "express";
import { ApiResponse } from "../http/ApiResponse";

export const notFoundMiddleware = (
    req: Request,
    res: Response,
) => {
    return ApiResponse.error(res, {
        statusCode: 404,
        message: "The requested route does not exist.",
        code: "NOT_FOUND_ROUTER",
    });
};
