import { PersonRepository } from "./person.repository";
import { PersonMapper } from "./person.mapper";
import { PersonResponseDTO } from "./person.dto";
import { CreatePersonBody, FilterListPersonParams, PersonCreateParams, PersonUpdateParams, UpdatePersonBody } from "./person.type";
import { AppError } from "@/shared/http/AppError";
import { Person } from "@generated/prisma/client";
import { DataWithPagination } from "@/shared/http/response.types";
import { DatabaseService } from "@/shared/database/database.service";


export class PersonService {
    constructor(
        private personRepository: PersonRepository,
        private databaseService: DatabaseService,
    ) {}
    
    public async listPerson(filter: FilterListPersonParams): Promise<DataWithPagination<PersonResponseDTO[]>> {
        const response:DataWithPagination<Person[]> = await this.personRepository.listPerson(this.databaseService.client, filter);
        const {data, pagination} = response;

        const resList: DataWithPagination<PersonResponseDTO[]> = {
            data: data.map(PersonMapper.toResponse),
            pagination,
        }

        return resList;
    }

    public async getPersonById(id: string): Promise<PersonResponseDTO> {
        const person:Person | null = await this.getPersonOrThrow(id);
        return PersonMapper.toResponse(person);
    }

    public async personExists(id: string): Promise<void>{
        await this.getPersonOrThrow(id);
    }

    // controlador de erro.
    private async getPersonOrThrow(id: string): Promise<Person>{
        const person: Person | null = await this.personRepository.getPersonById(this.databaseService.client, id);
        if(!person) {
            throw AppError.notFound("Person not found");
        }

        return person;
    }

    public async createPerson(data: CreatePersonBody): Promise<PersonResponseDTO> {
        const personData:PersonCreateParams = {
            name: data.name,
            phoneNumber: data.phoneNumber,
            cnh: data.cnh,
            cnpj: data.cnpj,
            cpf: data.cpf,
            municipalRegistration: data.municipalRegistration,
            rg: data.rg,
            secondaryPhoneNumber: data.secondaryPhoneNumber,
            stateRegistration: data.stateRegistration,
        };

        const person:Person = await this.personRepository.createPerson(this.databaseService.client, personData);
        return PersonMapper.toResponse(person);
    }

    public async updatePerson(id: string, data: UpdatePersonBody): Promise<PersonResponseDTO> {
        const personData:PersonUpdateParams = {
            name: data.name,
            phoneNumber: data.phoneNumber,
            cnh: data.cnh,
            cnpj: data.cnpj,
            cpf: data.cpf,
            municipalRegistration: data.municipalRegistration,
            rg: data.rg,
            secondaryPhoneNumber: data.secondaryPhoneNumber,
            stateRegistration: data.stateRegistration,
        };

        const person:Person = await this.personRepository.updatePerson(this.databaseService.client, id, personData);
        return PersonMapper.toResponse(person);
    }

    public async deletePerson(id: string): Promise<void> {
        await this.personRepository.deletePerson(this.databaseService.client, id);
    }

    public async deleteManyPerson(ids: string[]): Promise<number> {
        return await this.personRepository.deleteManyPerson(this.databaseService.client, ids);
    }
}
