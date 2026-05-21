import { ApiResponse } from "@/shared/http/ApiResponse";
import { ContractsService } from "./contracts.service";
import { Request, Response } from "express";

export class ContractsController {
    constructor (
        private contractService: ContractsService
    ){}

    public listContracts = async (req: Request, res: Response) => {
        const contracts = await this.contractService.listContracts();

        // converter bigint para string temporario
        const  response = contracts.map(contract => ({
            ...contract,
            totalAmount: contract.totalAmount.toString()
        }));
        return ApiResponse.ok(res, response, "Contracts fetched successfully");
    }
}
