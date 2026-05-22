import { Router } from "express";
import { contractsController } from "./contracts.container";
import { validateQuery } from "./contracts.validation";


const contractsRouter = Router();

// list many
contractsRouter.get(
    "/",
    validateQuery,
    contractsController.listContracts
);

export default contractsRouter;