import { ContractsRepository } from "./contracts.repository";


export class ContractsService {
    constructor (
        private contractsRepository: ContractsRepository
    ){}

    public async listContracts() {
        const contracts = await this.contractsRepository.listContracts();
        return contracts;
    }
}