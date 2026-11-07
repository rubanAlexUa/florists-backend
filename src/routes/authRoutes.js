import { Router } from 'express';

import {
  getMe,
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../controllers/authController.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
import { celebrate } from 'celebrate';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);

router.post('/auth/login', celebrate(loginUserSchema), loginUser);

router.post('/auth/logout', logoutUser);

router.post('/auth/refresh', refreshSession);

router.get('/user/me', authenticate, getMe);

export default router;
