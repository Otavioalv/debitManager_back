import { prisma } from "@/shared/database/prisma";

import { ContractsRepository } from "./contracts.repository";
import { ContractsService } from "./contracts.service";
import { ContractsController } from "./contracts.controller";


export const contractsRepository = new ContractsRepository(prisma);
export const contractsService = new ContractsService(contractsRepository);
export const contractsController = new ContractsController(contractsService);
