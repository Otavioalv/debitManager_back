import { Details } from "./response.types";

export class AppError extends Error {
    constructor(
        public statusCode: number,
        public code: string,
        public message: string,
        public details?: Details // /definir tipo do details
    ) {
        super(message);
    }
}
