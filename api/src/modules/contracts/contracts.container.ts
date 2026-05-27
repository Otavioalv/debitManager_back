import { prisma } from "@/shared/database/prisma";

import { ContractsRepository } from "./contracts.repository";
import { ContractsService } from "./contracts.service";
import { ContractsController } from "./contracts.controller";
import { DatabaseService } from "@/shared/database/database.service";

export const databaseService = new DatabaseService(prisma);
export const contractsRepository = new ContractsRepository();
export const contractsService = new ContractsService(contractsRepository, databaseService);
export const contractsController = new ContractsController(contractsService);
