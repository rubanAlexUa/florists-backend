import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const getAllPurchasesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1),
    perPage: Joi.number().min(5).max(20).default(20),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const purchaseIdSchema = {
  [Segments.PARAMS]: Joi.object({
    purchase_id: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createPurchaseSchema = {
  [Segments.BODY]: Joi.object({
    products: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().custom(objectIdValidator).required(),
          name: Joi.string().trim().required(),
          price: Joi.number().positive().required(),
          amount: Joi.number().integer().min(1).required(),
        }),
      )
      .min(1)
      .required(),
    totalProducts: Joi.number().min(1).required(),
    totalPrice: Joi.number().positive().required(),
  }),
};
