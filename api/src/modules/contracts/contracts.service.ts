import { DataWithPagination } from "@/shared/http/response.types";
import { ContractsRepository } from "./contracts.repository";
import { ContractWithCustomer, CreateContractBody, FilterListContractsParams, UpdateContractBody } from "./contracts.types";
import { ContractDetailsResponseDTO } from "./contracts.dto";
import { ContractsMapper } from "./contracts.mapper";
import { AppError } from "@/shared/http/AppError";
import { DatabaseService } from "@/shared/database/database.service";
import { InstallmentsRepository } from "../installments/installments.repository";
import { CreateInstallmentBody } from "../installments/installments.type";
import { generateInstallmentsForContract } from "../installments/generators/generate-installments";


export class ContractsService {
    constructor (
        private contractsRepository: ContractsRepository,
        private installmentsRepository: InstallmentsRepository,
        private databaseService: DatabaseService,
    ){}

    public async listContracts(filter: FilterListContractsParams): Promise<DataWithPagination<ContractDetailsResponseDTO[]>>{

        const response:DataWithPagination<ContractWithCustomer[]> = await this.contractsRepository.listContracts(this.databaseService.client, filter);
        const {data, pagination} = response;

        const resList: DataWithPagination<ContractDetailsResponseDTO[]> = {
            data: data.map(ContractsMapper.toDetailsResponse),
            pagination,
        }

        return resList;
    }

    public async getContractById(id: string): Promise<ContractDetailsResponseDTO> {
        const contract = await this.contractsRepository.getContractById(this.databaseService.client, id);
        
        if(!contract) {
            throw AppError.notFound("Contract not found");
        }

        return ContractsMapper.toDetailsResponse(contract);
    }

    public async createContract(data: CreateContractBody): Promise<ContractDetailsResponseDTO> {
        return this.databaseService.transaction(async (tx) => {
            const contract = await this.contractsRepository.createContract(tx, data);

            // const installmentsData = ContractsMapper.toInstallmentsData(contract);
            // await this.installmentsRepository.createManyInstallments(tx, installmentsData);

            const installmentsData = generateInstallmentsForContract({
                id: contract.id,
                totalAmount: contract.totalAmount,
                installmentCount: contract.installmentCount,
                startDate: contract.startDate,
                installmentFrequency: contract.installmentFrequency,
                skipSaturday: contract.skipSaturday,
                skipSunday: contract.skipSunday,
            });

            await this.installmentsRepository.createManyInstallments(tx, installmentsData);
            
            return ContractsMapper.toDetailsResponse(contract);
        });
    }

    public async updateContract(id: string, data: UpdateContractBody): Promise<ContractDetailsResponseDTO> {
        const contract = await this.contractsRepository.updateContract(this.databaseService.client, id, data);
        return ContractsMapper.toDetailsResponse(contract);
    }

    public async deleteContract(id: string): Promise<void>{
        await this.contractsRepository.deleteContract(this.databaseService.client, id);
    }

    public async deleteManyContracts(ids: string[]): Promise<number>{
        return await this.contractsRepository.deleteManyContracts(this.databaseService.client, ids);
    }

}