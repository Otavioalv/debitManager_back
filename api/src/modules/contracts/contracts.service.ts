import { DataWithPagination } from "@/shared/http/response.types";
import { ContractsRepository } from "./contracts.repository";
import { ContractCreateParams, ContractUpdateParams, ContractWithPerson, CreateContractBody, FilterListContractsParams, UpdateContractBody } from "./contracts.types";
import { ContractDetailsResponseDTO } from "./contracts.dto";
import { ContractsMapper } from "./contracts.mapper";
import { AppError } from "@/shared/http/AppError";
import { DatabaseService } from "@/shared/database/database.service";
import { InstallmentsRepository } from "../installments/installments.repository";
import { CreateInstallmentBody } from "../installments/installments.types";
import { generateInstallmentsForContract } from "../installments/generators/generate-installments";
import { convertDateToUtc } from "@/shared/utils/date.utils";


export class ContractsService {
    constructor (
        private contractsRepository: ContractsRepository,
        private installmentsRepository: InstallmentsRepository,
        private databaseService: DatabaseService,
    ){}

    public async listContracts(filter: FilterListContractsParams): Promise<DataWithPagination<ContractDetailsResponseDTO[]>>{

        const response:DataWithPagination<ContractWithPerson[]> = await this.contractsRepository.listContracts(this.databaseService.client, filter);
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
            const contractData:ContractCreateParams  = {
                person:{
                    connect: {
                        id: data.personId
                    }
                },
                title: data.title,
                totalAmount: data.totalAmount,
                installmentCount: data.installmentCount,
                installmentFrequency: data.installmentFrequency,
                interestRate: data.interestRate,
                interestPeriod: data.interestPeriod,
                timezone: data.timezone,
                description: data.description,
                startAt: convertDateToUtc(data.startDate, data.timezone),
                skipSaturday: data.skipSaturday,
                skipSunday: data.skipSunday,
            }

            const contract = await this.contractsRepository.createContract(tx, contractData);

            const installmentsData = generateInstallmentsForContract({
                id: contract.id,
                totalAmount: contract.totalAmount,
                installmentCount: contract.installmentCount,
                startAt: contract.startAt,
                installmentFrequency: contract.installmentFrequency,
                skipSaturday: contract.skipSaturday,
                skipSunday: contract.skipSunday,
            });

            await this.installmentsRepository.createManyInstallments(tx, installmentsData);
            return ContractsMapper.toDetailsResponse(contract);
        });
    }
    
    public async updateContract(id: string, data: UpdateContractBody): Promise<ContractDetailsResponseDTO> {
        const contractData:ContractUpdateParams  = {
            description: data.description,
            status: data.status,
            title: data.title
        }

        const contract = await this.contractsRepository.updateContract(this.databaseService.client, id, contractData);
        return ContractsMapper.toDetailsResponse(contract);
    }

    public async deleteContract(id: string): Promise<void>{
        await this.contractsRepository.deleteContract(this.databaseService.client, id);
    }

    public async deleteManyContracts(ids: string[]): Promise<number>{
        return await this.contractsRepository.deleteManyContracts(this.databaseService.client, ids);
    }

}
