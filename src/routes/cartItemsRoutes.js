import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  createCartItem,
  getAllCartsItems,
} from '../controllers/cartItemsController.js';
import { createCartItemValidation } from '../validations/cartItemsValidation.js';

const router = Router();

router.get('/cart', getAllCartsItems);

router.post('/cart/add', celebrate(createCartItemValidation), createCartItem);

export default router;
