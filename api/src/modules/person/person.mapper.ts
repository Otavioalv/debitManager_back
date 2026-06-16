import { Person } from "@generated/prisma/client";
import { PersonResponseDTO } from "./person.dto";


export class PersonMapper {
    static toResponse(person: Person): PersonResponseDTO {
        return {
            id: person.id.toString(),
            name: person.name,
            // balance: person.balance,
            phoneNumber: person.phoneNumber,
            secondaryPhoneNumber: person.secondaryPhoneNumber,
            cnh: person.cnh,
            cnpj: person.cnpj,
            cpf: person.cpf,
            rg: person.rg,
            municipalRegistration: person.municipalRegistration,
            stateRegistration: person.stateRegistration,
            createdAt: person.createdAt.toISOString(),
            updatedAt: person.updatedAt.toISOString(),
        };
    }
}


