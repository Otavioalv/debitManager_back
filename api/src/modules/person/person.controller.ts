import { Request, Response } from "express";
import { ApiResponse } from "@/shared/http/ApiResponse";
import { PersonService } from "./person.service";
import { PersonResponseDTO } from "./person.dto";
import { CreatePersonBody, FilterListPersonParams, UpdatePersonBody } from "./person.type";
import { DataWithPagination } from "@/shared/http/response.types";

export class PersonController {
    constructor(
        private personService: PersonService
    ) {}

    // list person
    public listPerson = async (req: Request, res: Response):Promise<ApiResponse> => {
        const filter:FilterListPersonParams = res.locals.validated.query as FilterListPersonParams;

        const data:DataWithPagination<PersonResponseDTO[]> = await this.personService.listPerson(filter);

        return ApiResponse.ok(res, data, "Person fetched successfully");
    }

    public getPersonById = async (req: Request, res: Response):Promise<ApiResponse> => {
        const { id } = res.locals.validated.params as { id: string };

        const data:PersonResponseDTO = await this.personService.getPersonById(id);

        return ApiResponse.ok(res, data, "Person fetched successfully");
    }

    public createPerson = async (req: Request, res: Response):Promise<ApiResponse> => {
        const createData = res.locals.validated.body as CreatePersonBody;

        const data:PersonResponseDTO = await this.personService.createPerson(createData);

        return ApiResponse.created(res, data, "Person created successfully");
    }

    public updatePerson = async (req: Request, res: Response):Promise<ApiResponse> => {
        const { id } = res.locals.validated.params as { id: string };
        const updateData = res.locals.validated.body as UpdatePersonBody;

        const data:PersonResponseDTO = await this.personService.updatePerson(id, updateData);

        return ApiResponse.ok(res, data, "Person updated successfully");
    }

    public deletePerson = async (req: Request, res: Response):Promise<ApiResponse> => {
        const { id } = res.locals.validated.params as { id: string };

        await this.personService.deletePerson(id);

        return ApiResponse.ok(res, null, "Person deleted successfully");
    }

    public deleteManyPerson = async (req: Request, res: Response):Promise<ApiResponse> => {
        const { ids } = res.locals.validated.body as { ids: string[] };

        const deleted:number = await this.personService.deleteManyPerson(ids);

        return ApiResponse.ok(res, { deleted }, "Person deleted successfully");
    }
}
