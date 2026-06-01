import { Router } from "express";
import { contractsController } from "./contracts.container";
import { validateBody, validateParams, validateQuery } from "./contracts.validation";
import { createContractBodySchema, deleteManyContractsBodySchema, updateContractBodySchema } from "./contracts.schema";


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

// update
contractsRouter.put(
    "/:id",
    validateParams,
    validateBody(updateContractBodySchema),
    contractsController.updateContract,
);

// // delete
// contractsRouter.delete(
//     "/:id",
//     validateParams,
//     contractsController.deleteContract,
// )

// // delete many
// contractsRouter.delete(
//     "/",
//     validateBody(deleteManyContractsBodySchema),
//     contractsController.deleteManyContracts,
// )

export default contractsRouter;
