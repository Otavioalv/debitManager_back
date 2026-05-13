import 'dotenv/config';
import express from 'express';

import routes from './routes/index';

// import { notFoundMiddleware } from './shared/middleware/notFound.middleware.js';
// import router from './modules/products/products.routes.js';
// import cors from 'cors';
import { errorMiddleware } from './shared/http/error.middleware';
import { notFoundMiddleware } from './shared/middlewares/notFound.middleware';


const app = express();

// change origin when production
// app.use(cors({
//     origin: "*"
// }));

app.use(express.json());

app.use("/api", routes);

// error 404 
app.use(notFoundMiddleware);

// Erros
app.use(errorMiddleware);

export default app;
