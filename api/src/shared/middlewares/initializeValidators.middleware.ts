import { NextFunction, Request, Response } from "express";

export const initializeValidatorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Aqui nós criamos o objeto real no JavaScript para todas as requisições
    res.locals.validated = { query: null, body: null, params: null };
    next();
}
