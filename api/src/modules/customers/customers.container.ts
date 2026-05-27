import { prisma } from "@/shared/database/prisma";

import { DatabaseService } from "@/shared/database/database.service";
import { CustomersController } from './customers.controller';
import { CustomersRepository } from './customers.repository';
import { CustomersService } from './customers.service';

export const databaseService = new DatabaseService(prisma);
export const customersRepository = new CustomersRepository();
export const customersService = new CustomersService(customersRepository, databaseService);
export const customersController = new CustomersController(customersService);

