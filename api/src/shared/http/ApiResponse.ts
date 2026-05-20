import { Response } from "express";
import { ErrorApiResponse, ErrorOptionsParams, SuccessApiResponse, SuccessOptionsParams } from "./response.types";

export class ApiResponse {
    static success<T>(
        res: Response<SuccessApiResponse<T>>,
        options: SuccessOptionsParams<T>
    ): Response<SuccessApiResponse<T>> {

        const response: SuccessApiResponse<T> = {
            success: true,
            message: options.message,
            data: options.data ?? null,
            meta: options.meta ?? null,
            error: null,
        }

        return res.status(options.statusCode ?? 200).json(response);
    }

    static error(
        res: Response<ErrorApiResponse>,
        options: ErrorOptionsParams
    ): Response<ErrorApiResponse> {

        const response: ErrorApiResponse = {
            success: false,
            message: options.message,
            data: null,
            meta: null,
            error: {
                code: options.code,
                details: options.details ?? null
            },
        }
        return res.status(options.statusCode ?? 500).json(response);
    }

    
    static ok<T>(
        res: Response,
        data?: T,
        message = "Success",
    ) {
        return this.success(
            res,
            {
                statusCode: 200,
                message,
                data,
            }
        );
    }

    static created<T>(
        res: Response,
        data?: T,
        message = "Created successfully",
    ): Response<SuccessApiResponse<T>> {

        return this.success(res, {
            statusCode: 201,
            message,
            data,
        });
    }
}
