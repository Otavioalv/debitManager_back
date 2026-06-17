import { Router } from "express";
import { installmentsController } from "./installments.container";
import { validateQuery } from "./installments.validation";


const installmentsRouter = Router();

// list installments
installmentsRouter.get(
    "/",
    validateQuery,
    installmentsController.listAllInstallments
);

export default installmentsRouter;
