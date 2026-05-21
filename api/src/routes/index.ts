import { Router } from "express";

import customersRoutes from "@/modules/customers/customers.routes";
import contractsRouter from "@/modules/contracts/contracts.routes";

const router = Router();


// routes
router.use("/customers", customersRoutes);
router.use("/contracts", contractsRouter);

router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

export default router;
