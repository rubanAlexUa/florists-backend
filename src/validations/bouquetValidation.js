import { Joi, Segments } from 'celebrate';

export const getAllBouquetsValidation = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1),
    perPage: Joi.number().min(5).max(20).default(20),
  }),
};
