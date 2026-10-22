import { Joi, Segments } from 'celebrate';
import { ROLES } from '../constants/userRoles.js';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().min(3).max(20),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string()
      .trim()
      .valid(...ROLES)
      .required(),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
