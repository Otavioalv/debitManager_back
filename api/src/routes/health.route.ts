import { prisma } from "@/shared/database/prisma";
import { Router } from "express";

const healthRouter = Router();

healthRouter.get('/health', async (_, res) => {
    // await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        // database: 'ok',
    });
});

export default healthRouter;
