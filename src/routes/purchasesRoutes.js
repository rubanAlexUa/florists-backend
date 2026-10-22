import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getAllPurchases,
  getPurchaseById,
  createPurchase,
} from '../controllers/purchasesController.js';
import {
  getAllPurchasesSchema,
  purchaseIdSchema,
  createPurchaseSchema,
} from '../validations/purchasesValidator.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use('/purchases', authenticate);

router.get('/purchases', celebrate(getAllPurchasesSchema), getAllPurchases);

router.get(
  '/purchases/:purchase_id',
  celebrate(purchaseIdSchema),
  getPurchaseById,
);

router.post('/purchases/add', celebrate(createPurchaseSchema), createPurchase);

export default router;
