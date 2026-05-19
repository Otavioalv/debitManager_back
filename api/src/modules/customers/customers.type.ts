import z from "zod";
import { customerParamsSchema, listCustomersQuerySchema } from "./customers.schema";

interface customer {
    id: string,
    name: string,
    phoneNumber: string,
    balance: number,
    createdAt: Date,
    updatedAt: Date,
}

export type FilterListCustomerParams = z.infer<typeof listCustomersQuerySchema>;
export type CustomerParams = z.infer<typeof customerParamsSchema>;

