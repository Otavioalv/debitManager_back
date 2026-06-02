import { Router } from "express";

import customersRoutes from "@/modules/customers/customers.routes";
import contractsRouter from "@/modules/contracts/contracts.routes";
import healthRouter from "./health.route";

const router = Router();


// routes
router.use("/customers", customersRoutes);
router.use("/contracts", contractsRouter);
// /installments 

router.use(healthRouter);

export default router;
