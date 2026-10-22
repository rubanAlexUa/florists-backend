import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

import { PRODUCTS_TYPES } from '../constants/productsTypes.js';

export const getAllPlantsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1),
    perPage: Joi.number().min(5).max(20).default(20),
    type: Joi.string()
      .trim()
      .valid(...PRODUCTS_TYPES)
      .allow(''),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid Id format') : value;
};

export const plantIdSchema = {
  [Segments.PARAMS]: Joi.object({
    plant_id: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createPlantSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(5).max(25).trim().required(),
    description: Joi.string().trim().required(),
    type: Joi.string()
      .valid(...PRODUCTS_TYPES)
      .required(),
    price: Joi.number().integer().min(1).required(),
    amount: Joi.number().integer().min(1).required(),
  }),
};

export const updatePlantSchema = {
  [Segments.PARAMS]: Joi.object({
    plant_id: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(5).max(25).trim(),
    description: Joi.string().trim(),
    type: Joi.string().valid(...PRODUCTS_TYPES),
    price: Joi.number().integer().min(1),
    amount: Joi.number().integer().min(0),
  }).min(1),
};
