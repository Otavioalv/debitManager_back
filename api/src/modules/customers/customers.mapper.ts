import { Customer } from "@generated/prisma/client";
import { CustomerResponseDTO } from "./customers.dto";


export class CustomersMapper {
    static toResponse(customer: Customer): CustomerResponseDTO {
        return {
            id: customer.id.toString(),
            name: customer.name,
            balance: customer.balance.toString(),
            phoneNumber: customer.phoneNumber,
            createdAt: customer.createdAt.toISOString(),
            updatedAt: customer.updatedAt.toISOString(),
        };
    }
}


