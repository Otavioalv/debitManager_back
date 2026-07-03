import { prisma } from "@/shared/database/prisma";

import { ContractsRepository } from "./contracts.repository";
import { ContractsService } from "./contracts.service";
import { ContractsController } from "./contracts.controller";
import { DatabaseService } from "@/shared/database/database.service";
import { installmentsRepository, installmentsService } from "../installments/installments.container";
import { personRepository, personService } from "../person/person.container";

export const databaseService = new DatabaseService(prisma);
export const contractsRepository = new ContractsRepository();
export const contractsService = new ContractsService(
    contractsRepository, 
    installmentsRepository,
    installmentsService,
    personService,
    databaseService
);
export const contractsController = new ContractsController(contractsService);
