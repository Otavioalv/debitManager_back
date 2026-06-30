import { Request, Response, Router } from "express";
import { installmentsController } from "./installments.container";
import { validateQuery } from "./installments.validation";
import { ApiResponse } from "@/shared/http/ApiResponse";
import { timezoneMiddleware } from "@/shared/middlewares/timezone.middleware";


const installmentsRouter = Router();


/* usar inicio e fim pra envio dos horarios */
// list installments
installmentsRouter.get(
    "/",
    timezoneMiddleware,
    validateQuery,
    installmentsController.listAllInstallments
);

export default installmentsRouter;
