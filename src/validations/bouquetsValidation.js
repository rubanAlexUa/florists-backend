import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const getAllBouquetsValidation = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1),
    perPage: Joi.number().min(5).max(20).default(20),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const bouquetIdValidator = {
  [Segments.PARAMS]: Joi.object({
    bouquet_id: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createBouquetSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(5).max(25).trim().required(),
    description: Joi.string().min(50).trim().required(),
    flowers: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          amount: Joi.number().integer().min(1).required(),
          plantId: Joi.string().custom(objectIdValidator).required(),
        }),
      )
      .min(1)
      .required(),
  }),
};

export const updateBouquetSchema = {
  [Segments.PARAMS]: Joi.object({
    bouquet_id: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(5).max(25).trim(),
    description: Joi.string().min(50).trim(),
    flowers: Joi.array()
      .items(
        Joi.object({
          name: Joi.string(),
          amount: Joi.number().integer().min(1),
          plantId: Joi.string().custom(objectIdValidator),
        }),
      )
      .min(1),
  }).min(1),
};
