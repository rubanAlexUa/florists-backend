import { Router } from 'express';
import { getUserById } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = new Router();

router.get('/users/:customer_id', authenticate, getUserById);

export default router;
