import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';

import plantsRoutes from './routes/plantsRoutes.js';
import cartItemsRoutes from './routes/cartItemsRoutes.js';
import bouquetsRoutes from './routes/bouquetsRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(logger);

app.use(plantsRoutes);
app.use(cartItemsRoutes);
app.use(bouquetsRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
