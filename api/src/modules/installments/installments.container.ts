import { DatabaseService } from "@/shared/database/database.service";
import { prisma } from "@/shared/database/prisma";
import { InstallmentsRepository } from "./installments.repository";
import { InstallmentsService } from "./installments.service";
import { InstallmentsController } from "./installments.controller";

export const databaseService = new DatabaseService(prisma);
export const installmentsRepository = new InstallmentsRepository();
export const installmentsService = new InstallmentsService(installmentsRepository, databaseService);
export const installmentsController = new InstallmentsController(installmentsService);

