import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getAllPurchases,
  getPurchaseById,
  createPurchase,
  deletePurchase,
} from '../controllers/purchasesController.js';
import {
  getAllPurchasesSchema,
  purchaseIdSchema,
  createPurchaseSchema,
  deletePurchaseSchema,
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

router.post('/purchases', celebrate(createPurchaseSchema), createPurchase);

router.patch(
  '/purchase/:purchase_id',
  celebrate(deletePurchaseSchema),
  deletePurchase,
);

export default router;
