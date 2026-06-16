import { Router } from "express";

import personRoutes from "@/modules/person/person.routes";
import contractsRouter from "@/modules/contracts/contracts.routes";
import healthRouter from "./health.route";

const router = Router();


// routes
router.use("/person", personRoutes);
router.use("/contracts", contractsRouter);
// /installments 

router.use(healthRouter);

export default router;
