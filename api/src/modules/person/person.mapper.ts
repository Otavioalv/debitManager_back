import { Person } from "@generated/prisma/client";
import { PersonResponseDTO } from "./person.dto";


export class PersonMapper {
    static toResponse(person: Person): PersonResponseDTO {
        return {
            id: person.id.toString(),
            name: person.name,
            balance: person.balance,
            phoneNumber: person.phoneNumber,
            createdAt: person.createdAt.toISOString(),
            updatedAt: person.updatedAt.toISOString(),
        };
    }
}


