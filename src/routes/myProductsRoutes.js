import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getAllMyProducts } from '../controllers/myProducts.js';

const router = new Router();

router.get('/products/my', authenticate, getAllMyProducts);

export default router;
