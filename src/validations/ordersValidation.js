import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const getAllOrdersSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1),
    perPage: Joi.number().min(5).max(20).default(20),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const orderIdSchema = {
  [Segments.PARAMS]: Joi.object({
    order_id: Joi.string().custom(objectIdValidator).required(),
  }),
};

// export const updateOrderStatusSchema = {
//   [Segments.PARAMS]: Joi.object({
//     order_id: Joi.string().custom(objectIdValidator).required(),
//   }),
//   [Segments.BODY]: Joi.object({
//     status: Joi.string().valid(['cancelled', 'completed']).required(),
//   }),
// };
