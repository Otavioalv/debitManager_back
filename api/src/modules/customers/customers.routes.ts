import { Router } from 'express';

import { customersController } from './customers.container';
import { validateBody, validateParams, validateQuery } from './customers.validation';

const customersRouter = Router();

// list many
customersRouter.get(
    "/",
    validateQuery,
    customersController.listCustomers,
);

// list by id
customersRouter.get(
    "/:id",
    validateParams,
    customersController.getCustomerById,
);

// create customer
customersRouter.post(
    "/",
    validateBody,
    customersController.createCustomer,
);



export default customersRouter;

