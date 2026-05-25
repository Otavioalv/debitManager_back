import { ApiResponse } from "@/shared/http/ApiResponse";
import { ContractsService } from "./contracts.service";
import { Request, Response } from "express";
import { CreateContractBody, FilterListContractsParams } from "./contracts.types";

export class ContractsController {
    constructor (
        private contractService: ContractsService
    ){}

    public listContracts = async (req: Request, res: Response) => {
        const filter: FilterListContractsParams = res.locals.validated.query as FilterListContractsParams;

        const contracts = await this.contractService.listContracts(filter);

        return ApiResponse.ok(res, contracts, "Contracts fetched successfully");
    }

    public getContractById = async (req: Request, res: Response) => {
        const {id} = res.locals.validated.params as { id: string };

        const data = await this.contractService.getContractById(id);

        return ApiResponse.ok(res, data, "Contract fetched successfully");
    }

    public createContract = async (req: Request, res: Response) => {
        const createData = res.locals.validated.body as CreateContractBody;

        const data = await this.contractService.createContract(createData);

        return ApiResponse.ok(res, data, "Contract created successfully");
    }

}
