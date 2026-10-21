import { Joi, Segments } from 'celebrate';

export const createCartItemValidation = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().required(),
    price: Joi.number().required(),
    amount: Joi.number().min(1).max(100),
    productId: Joi.string().required(),
  }),
};
