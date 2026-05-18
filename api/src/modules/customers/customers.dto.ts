import { Pagination } from "@/shared/http/response.types";


/* 
name: string;
id: string;
balance: bigint;
phoneNumber: string;
createdAt: Date;
updatedAt: Date
*/


export interface CustomerResponseDTO {
    name: string;
    id: string;
    balance: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}

export interface DataWithPagination<T> {
    data: T,
    pagination: Pagination,
}