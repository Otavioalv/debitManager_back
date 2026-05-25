import { Router } from "express";
import { contractsController } from "./contracts.container";
import { validateParams, validateQuery } from "./contracts.validation";


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

export default contractsRouter;