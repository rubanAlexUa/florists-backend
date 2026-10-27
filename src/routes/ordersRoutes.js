import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  getAllOrdersSchema,
  orderIdSchema,
} from '../validations/ordersValidation.js';
import { getAllOrders, getOrderById } from '../controllers/ordersController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/orders', authenticate);
router.get('/orders', celebrate(getAllOrdersSchema), getAllOrders);
router.get('/orders/:order_id', celebrate(orderIdSchema), getOrderById);

// router.patch(
//   '/orders/:order_id',
//   celebrate(updateOrderStatusSchema),
//   updateOrderStatus,
// );

export default router;
