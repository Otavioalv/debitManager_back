import { ApiResponse } from "@/shared/http/ApiResponse";
import { ContractsService } from "./contracts.service";
import { Request, Response } from "express";
import { FilterListContractsParams } from "./contracts.types";

export class ContractsController {
    constructor (
        private contractService: ContractsService
    ){}

    public listContracts = async (req: Request, res: Response) => {
        const filter: FilterListContractsParams = res.locals.validated.query as FilterListContractsParams;

        const contracts = await this.contractService.listContracts(filter);

        // converter bigint para string temporario
        const  response = contracts.map(contract => ({
            ...contract,
            totalAmount: contract.totalAmount.toString()
        }));

        return ApiResponse.ok(res, response, "Contracts fetched successfully");
    }
}
