import "express";

declare global {
    namespace Express {
        interface Locals {
            validated: {
                query: {} | null;
                body: {} | null;
                params: {} | null;
            };
        }
    }
}

export {};
