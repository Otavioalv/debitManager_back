import { Router } from "express";

// import customersRoutes from "../modules/customers/customers.routes.js";

const router = Router();

// router.use("/customers", customersRoutes);

router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

export default router;
