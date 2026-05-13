import 'dotenv/config';
import express from 'express';

import routes from './routes/index';

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


app.use("/api", routes);

// error 404 
// app.use(notFoundMiddleware);

export default app;
