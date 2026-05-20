import { Details } from "./response.types";

// Separar codigos por status code, exemplo: {404: notFound, 400: badRequest, etc}
// ou criar classes de erro extendendo a classe AppError, 
// exemplo: NotFoundError extends AppError, BadRequestError extends AppError, etc


export class AppError extends Error {
    constructor(
        public readonly statusCode: number,
        public readonly code: string,
        public readonly message: string,
        public readonly details?: Details // /definir tipo do details
    ) {
        super(message);
    }

    static notFound(
        message = "Resource not found",
        details?: Details,
    ){
        return new AppError(
            404,
            "RESOURCE_NOT_FOUND",
            message,
            details
        )
    }

    static badRequest(
        message = "Bad request",
        details?: Details,
    ) {
        return new AppError(
            400,
            "BAD_REQUEST",
            message,
            details,
        );
    }
    
    static conflict(
        message = "Conflict",
        details?: Details,
    ) {
        return new AppError(
            409,
            "CONFLICT",
            message,
            details,
        );
    }

}
