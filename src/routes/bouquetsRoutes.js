import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  createBouquet,
  deleteBouquet,
  getAllBouquets,
  getBouquetById,
  updateBouquet,
} from '../controllers/bouquetsController.js';
import {
  bouquetIdValidator,
  createBouquetSchema,
  getAllBouquetsValidation,
  updateBouquetSchema,
} from '../validations/bouquetsValidation.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { parseFlowers } from '../middlewares/parseFlowers.js';

const router = Router();

router.get('/bouquets', celebrate(getAllBouquetsValidation), getAllBouquets);

router.get(
  '/bouquets/:bouquet_id',
  celebrate(bouquetIdValidator),
  getBouquetById,
);

router.post(
  '/bouquets',
  authenticate,
  upload.single('productImage'),
  parseFlowers,
  celebrate(createBouquetSchema),
  createBouquet,
);

router.patch(
  '/bouquets/:bouquet_id',
  authenticate,
  upload.single('productImage'),
  parseFlowers,
  celebrate(updateBouquetSchema),
  updateBouquet,
);

router.delete(
  'bouquets/:bouquet_id',
  authenticate,
  celebrate(bouquetIdValidator),
  deleteBouquet,
);

export default router;
