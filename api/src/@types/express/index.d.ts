import "express";

declare global {
    namespace Express {
        interface Locals {
            validated: {
                query: unknown;
                body: unknown;
                params: unknown;
                headers: {
                    timeZone?: string,
                }
            };
        }
    }
}

export {};
