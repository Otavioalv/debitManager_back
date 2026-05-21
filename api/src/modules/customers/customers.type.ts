import z from "zod";
import { 
    createCustomerBodySchema, 
    customerParamsSchema, 
    listCustomersQuerySchema, 
    updateCustomerBodySchema,
} from "./customers.schema";

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

export type CreateCustomerBody = z.infer<typeof createCustomerBodySchema>;
export type CreateCustomerInputBody = z.input<typeof createCustomerBodySchema>;

export type UpdateCustomerBody = z.infer<typeof updateCustomerBodySchema>;

