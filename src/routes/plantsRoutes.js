import { Router } from 'express';
import { celebrate } from 'celebrate';

import { getAllPlants, getPlantById } from '../controllers/plantsController.js';
import {
  getAllPlantsSchema,
  plantIdSchema,
} from '../validations/plantsValidation.js';

const router = Router();

router.get('/plants', celebrate(getAllPlantsSchema), getAllPlants);
router.get('/plants/:plant_id', celebrate(plantIdSchema), getPlantById);

export default router;
