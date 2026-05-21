import { Router } from "express";
import { contractsController } from "./contracts.container";


const contractsRouter = Router();

// list many
contractsRouter.get(
    "/",
    contractsController.listContracts
);

export default contractsRouter;