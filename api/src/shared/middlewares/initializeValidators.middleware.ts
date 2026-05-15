import { NextFunction, Request, Response } from "express";

export const initializeValidatorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.locals.validated = { query: null, body: null, params: null };
    next();
}
