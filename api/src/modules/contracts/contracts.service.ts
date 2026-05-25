import { DataWithPagination } from "@/shared/http/response.types";
import { ContractsRepository } from "./contracts.repository";
import { ContractWithCustomer, FilterListContractsParams } from "./contracts.types";
import { ContractDetailsResponseDTO } from "./contracts.dto";
import { ContractsMapper } from "./contracts.mapper";


export class ContractsService {
    constructor (
        private contractsRepository: ContractsRepository
    ){}

    public async listContracts(filter: FilterListContractsParams): Promise<DataWithPagination<ContractDetailsResponseDTO[]>>{        
        const response:DataWithPagination<ContractWithCustomer[]> = await this.contractsRepository.listContracts(filter);
        const {data, pagination} = response;

        const resList: DataWithPagination<ContractDetailsResponseDTO[]> = {
            data: data.map(ContractsMapper.toDetailsResponse),
            pagination,
        }

        return resList;
    }
}