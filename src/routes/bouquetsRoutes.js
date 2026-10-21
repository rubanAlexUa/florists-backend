import { Router } from 'express';
import { celebrate } from 'celebrate';

import { getAllBouquets } from '../controllers/bouquetController.js';
import { getAllBouquetsValidation } from '../validations/bouquetValidation.js';

const router = Router();

router.get('/bouquets', celebrate(getAllBouquetsValidation), getAllBouquets);

export default router;
