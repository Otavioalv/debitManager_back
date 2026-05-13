
export class AppError extends Error {
    constructor(
        public statusCode: number,
        public code: string,
        public message: string,
        public details?: unknown // /definir tipo do details
    ) {
        super(message);
    }
}
