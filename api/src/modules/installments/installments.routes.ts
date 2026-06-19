import { Request, Response, Router } from "express";
import { installmentsController } from "./installments.container";
import { validateQuery } from "./installments.validation";
import { ApiResponse } from "@/shared/http/ApiResponse";


const installmentsRouter = Router();

// list installments
installmentsRouter.get(
    "/",
    validateQuery,
    installmentsController.listAllInstallments
);

export default installmentsRouter;
