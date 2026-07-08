import { Request, Response, Router } from "express";
import { installmentsController } from "./installments.container";
import { validateParams, validateQuery } from "./installments.validation";
import { ApiResponse } from "@/shared/http/ApiResponse";
import { timezoneMiddleware } from "@/shared/middlewares/timezone.middleware";


const installmentsRouter = Router();


/* usar inicio e fim pra envio dos horarios */
// list installments
installmentsRouter.get(
    "/",
    // timezoneMiddleware,
    validateQuery,
    installmentsController.listAllInstallments
);


// list by id
installmentsRouter.get(
    "/:id",
    validateParams,
    installmentsController.getInstallmentById
);

installmentsRouter.post(
    "/:id/payments",
    validateParams,
    installmentsController.receivePayment,
);


export default installmentsRouter;
