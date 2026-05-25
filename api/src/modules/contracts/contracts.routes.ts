import { Router } from "express";
import { contractsController } from "./contracts.container";
import { validateBody, validateParams, validateQuery } from "./contracts.validation";
import { createContractBodySchema } from "./contracts.schema";


const contractsRouter = Router();

// list many
contractsRouter.get(
    "/",
    validateQuery,
    contractsController.listContracts
);

// list by id
contractsRouter.get(
    "/:id",
    validateParams,
    contractsController.getContractById,
);

// create
contractsRouter.post(
    "/",
    validateBody(createContractBodySchema),
    contractsController.createContract,
);




export default contractsRouter;
