import { Router } from 'express';
import { getUserById } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { celebrate } from 'celebrate';
import { getUserByIdSchema } from '../validations/userValidation.js';

const router = new Router();

router.get(
  '/users/:customer_id',
  authenticate,
  celebrate(getUserByIdSchema),
  getUserById,
);

export default router;
