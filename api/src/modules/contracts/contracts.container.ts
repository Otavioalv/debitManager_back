import { prisma } from "@/shared/database/prisma";

import { ContractsRepository } from "./contracts.repository";
import { ContractsService } from "./contracts.service";
import { ContractsController } from "./contracts.controller";
import { DatabaseService } from "@/shared/database/database.service";
import { InstallmentsRepository } from "../installments/installments.repository";

export const databaseService = new DatabaseService(prisma);

// Repositories
export const installmentsRepository = new InstallmentsRepository();
export const contractsRepository = new ContractsRepository();

export const contractsService = new ContractsService(
    contractsRepository, 
    installmentsRepository, 
    databaseService
);
export const contractsController = new ContractsController(contractsService);
