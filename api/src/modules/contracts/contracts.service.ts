import { ContractsRepository } from "./contracts.repository";
import { FilterListContractsParams } from "./contracts.types";


export class ContractsService {
    constructor (
        private contractsRepository: ContractsRepository
    ){}

    public async listContracts(filter: FilterListContractsParams) {
        const contracts = await this.contractsRepository.listContracts(filter);
        return contracts;
    }
}