import 'dotenv/config';
import express from 'express';

// import { notFoundMiddleware } from './shared/middleware/notFound.middleware.js';
// import router from './modules/products/products.routes.js';
// import cors from 'cors';

import type { Request, Response } from 'express';


const app = express();

// change origin when production
// app.use(cors({
//     origin: "*"
// }));

app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// app.use('/api', router);

// error 404 
// app.use(notFoundMiddleware);

export default app;