import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  createPlant,
  deletePlant,
  getAllPlants,
  getPlantById,
  updatePlant,
} from '../controllers/plantsController.js';
import {
  createPlantSchema,
  getAllPlantsSchema,
  plantIdSchema,
  updatePlantSchema,
} from '../validations/plantsValidation.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/plants', celebrate(getAllPlantsSchema), getAllPlants);
router.get('/plants/:plant_id', celebrate(plantIdSchema), getPlantById);

router.post('/plants', authenticate, celebrate(createPlantSchema), createPlant);

router.patch(
  '/plants/:plant_id',
  authenticate,
  celebrate(updatePlantSchema),
  updatePlant,
);

router.delete(
  '/plants/:plant_id',
  authenticate,
  celebrate(plantIdSchema),
  deletePlant,
);
export default router;
