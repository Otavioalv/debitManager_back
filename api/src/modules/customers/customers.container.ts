import { CustomersController } from './customers.controller';
import { CustomersRepository } from './customers.repository';
import { CustomersService } from './customers.service';


export const customersRepository = new CustomersRepository();
export const customersService = new CustomersService(customersRepository);
export const customersController = new CustomersController(customersService);

