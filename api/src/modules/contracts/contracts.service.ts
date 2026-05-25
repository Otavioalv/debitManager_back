import { DataWithPagination } from "@/shared/http/response.types";
import { ContractsRepository } from "./contracts.repository";
import { ContractWithCustomer, CreateContractBody, FilterListContractsParams } from "./contracts.types";
import { ContractDetailsResponseDTO } from "./contracts.dto";
import { ContractsMapper } from "./contracts.mapper";
import { AppError } from "@/shared/http/AppError";


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

    public async getContractById(id: string): Promise<ContractDetailsResponseDTO> {
        const contract = await this.contractsRepository.getContractById(id);
        
        if(!contract) {
            throw AppError.notFound("Contract not found");
        }

        return ContractsMapper.toDetailsResponse(contract);
    }

    public async createContract(data: CreateContractBody): Promise<ContractDetailsResponseDTO> {
        const contract = await this.contractsRepository.createContract(data);
        return ContractsMapper.toDetailsResponse(contract);
    }

}