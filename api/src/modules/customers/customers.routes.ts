import { Router } from 'express';

import { customersController } from './customers.container';
import { validateBody, validateParams, validateQuery } from './customers.validation';
import { createCustomerBodySchema, deleteManyCustomersBodySchema, updateCustomerBodySchema } from './customers.schema';

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
    validateBody(createCustomerBodySchema),
    customersController.createCustomer,
);

// update customer
customersRouter.put(
    "/:id",
    validateParams,
    validateBody(updateCustomerBodySchema),
    customersController.updateCustomer,
);

// delete customer
customersRouter.delete(
    "/:id",
    validateParams,
    customersController.deleteCustomer,
);

// delete many customers
customersRouter.delete(
    "/",
    validateBody(deleteManyCustomersBodySchema),
    customersController.deleteManyCustomers,
);

export default customersRouter;

