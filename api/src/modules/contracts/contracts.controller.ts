import { ApiResponse } from "@/shared/http/ApiResponse";
import { ContractsService } from "./contracts.service";
import { Request, Response } from "express";
import { 
    CreateContractBody, 
    FilterListContractsParams, 
    UpdateContractBody 
} from "./contracts.types";

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

        return ApiResponse.created(res, data, "Contract created successfully");
    }
    
    public updateContract = async (req: Request, res: Response) => {
        const { id } = res.locals.validated.params as { id: string };
        const updateData = res.locals.validated.body as UpdateContractBody;

        const data = await this.contractService.updateContract(id, updateData);

        return ApiResponse.ok(res, data, "Contract updated successfully");
    }

    public deleteContract = async (req: Request, res: Response) => {
        const {id} = res.locals.validated.params as {id: string};

        await this.contractService.deleteContract(id);

        return ApiResponse.ok(res, null, "Contract deleted successfully");
    }

    public deleteManyContracts = async (req: Request, res: Response) => {
        const { ids } = res.locals.validated.body as {ids: string[]};

        const deleted = await this.contractService.deleteManyContracts(ids);

        return ApiResponse.ok(res, {deleted}, "Contracts deleted successfully");
    }
}
