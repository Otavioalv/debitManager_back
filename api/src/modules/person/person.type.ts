import z from "zod";
import { 
    createPersonBodySchema, 
    personParamsSchema, 
    listPersonQuerySchema, 
    updatePersonBodySchema,
} from "./person.schema";

export interface person {
    id: string,
    name: string,
    phoneNumber: string,
    balance: number,
    createdAt: Date,
    updatedAt: Date,
}

export type FilterListPersonParams = z.infer<typeof listPersonQuerySchema>;
export type PersonParams = z.infer<typeof personParamsSchema>;

export type CreatePersonBody = z.infer<typeof createPersonBodySchema>;
export type CreatePersonInputBody = z.input<typeof createPersonBodySchema>;

export type UpdatePersonBody = z.infer<typeof updatePersonBodySchema>;

