import { Pagination } from "../http/response.types";

export interface PaginatedResult<T> {
    data: T[];
    pagination: Pagination;
}

/**
 * Constrói a resposta paginada com cursores baseados no ID.
 * @param itemsFromDb Array retornado do Prisma (com take: limit + 1)const pagination: Pagination = {
                cursor: filter.cursor ?? "",
                hasNextPage: hasNextPage,
                limit: filter.limit,
                nextCursor: nextCursor,
                previousCursor: previousCursor,
            }
 * @param limit O limite original solicitado pelo usuário
 * @param currentCursor O cursor original solicitado pelo usuário
 */

export function buildPaginatedResponse<T extends { id: string }>(
    itemsFromDb: T[],
    limit: number,
    currentCursor?: string,
): PaginatedResult<T> {
    
    const hasNextPage = itemsFromDb.length > limit;

    const data = hasNextPage ? itemsFromDb.slice(0, -1) : itemsFromDb;

    const nextCursor = hasNextPage 
        ? data[data.length - 1]?.id
        : null;

    const previousCursor = currentCursor && data.length > 0 
        ? data[0].id 
        : null;

    return {
        data,
        pagination: {
            cursor: currentCursor ?? "",
            hasNextPage,
            limit,
            nextCursor,
            previousCursor,
        }
    };
}