import {PrismaClient} from "../../../generated/prisma/client"

import { CustomersController } from './customers.controller';
import { CustomersRepository } from './customers.repository';
import { CustomersService } from './customers.service';


// const prisma = new PrismaClient();

export const customersRepository = new CustomersRepository();
export const customersService = new CustomersService(customersRepository);
export const customersController = new CustomersController(customersService);

