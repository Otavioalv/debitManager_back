import { Router } from 'express';

import { personController } from './person.container';
import { validateBody, validateParams, validateQuery } from './person.validation';
import { 
    createPersonBodySchema, 
    deleteManyPersonBodySchema, 
    updatePersonBodySchema 
} from './person.schema';

const personRouter = Router();

// list many
personRouter.get(
    "/",
    validateQuery,
    personController.listPerson,
);

// list by id
personRouter.get(
    "/:id",
    validateParams,
    personController.getPersonById,
);

// create person
personRouter.post(
    "/",
    validateBody(createPersonBodySchema),
    personController.createPerson,
);

// update person
personRouter.put(
    "/:id",
    validateParams,
    validateBody(updatePersonBodySchema),
    personController.updatePerson,
);

// delete person
personRouter.delete(
    "/:id",
    validateParams,
    personController.deletePerson,
);

// delete many person
personRouter.delete(
    "/",
    validateBody(deleteManyPersonBodySchema),
    personController.deleteManyPerson,
);

export default personRouter;

