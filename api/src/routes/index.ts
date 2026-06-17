import { Router } from "express";

import personRoutes from "@/modules/person/person.routes";
import contractsRouter from "@/modules/contracts/contracts.routes";
import healthRouter from "./health.route";
import installmentsRouter from "@/modules/installments/installments.routes";

const router = Router();


// routes
router.use("/person", personRoutes);
router.use("/contracts", contractsRouter);
router.use("/installments", installmentsRouter);

router.use(healthRouter);

export default router;
