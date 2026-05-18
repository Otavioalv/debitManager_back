import { z } from "zod";

export interface Pagination {
    cursor: string | null,
    nextCursor: string | null,
    previousCursor: string | null,
    hasNextPage: boolean
    limit: number
}

export interface Meta {
    pagination?: Pagination,
    filters?: Record<string, unknown>,
}


export type ZodTreeError = ReturnType<typeof z.treeifyError>;
export interface Details {
    zod?: ZodTreeError
}

// PARAMS
export interface BaseResponseOptions {
    statusCode?: number, 
    message: string,
}

export interface SuccessOptionsParams<T> extends BaseResponseOptions {
    data: T | null,
    meta?: Meta | null,
}

export interface ErrorOptionsParams extends BaseResponseOptions {
    code: string,
    details?: Details, // Definir tipo depois
}


// RESPONSES
export interface ErrorResponsePayload {
    code: string;
    details?: unknown; // Definir tipo expecifiro depois 
}

export interface BaseApiResponse<T> {
    success: boolean,
    message: string,
    data: T | null,
    meta: Meta | null,
    error: ErrorResponsePayload | null
}

export interface SuccessApiResponse<T> extends BaseApiResponse<T>{
    success: true,
    error: null,
}

export interface ErrorApiResponse extends BaseApiResponse<null>{
    success: false,
    data: null,
    meta: null,
    error: ErrorResponsePayload,
}

export type ApiResponse<T> = 
    | SuccessApiResponse<T> 
    | ErrorApiResponse;

/* 
"meta": {
    "pagination": {
        "nextCursor": "abc123",
        "previousCursor": null,
        "hasNextPage": true,
        "limit": 20
    }
}

"meta": {
    "pagination": {},
    "filters": {},
    "sort": {},
    "cache": {},
    "timing": {}
}
*/
