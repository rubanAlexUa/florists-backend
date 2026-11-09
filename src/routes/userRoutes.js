import { Router } from 'express';
import { getUserById } from '../controllers/userController.js';

const router = new Router();

router.get('/users/:customer_id', authenticate, getUserById);

export default router;
