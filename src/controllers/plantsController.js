import createHttpError from 'http-errors';
import { Plant } from '../models/plants.js';
import { Bouquet } from '../models/bouquets.js';
import { saveFileToCloudinary } from '../../utils/saveFileToCloudinary.js';

export const getAllPlants = async (req, res) => {
  const { page = 1, perPage = 10, type } = req.query;

  const skip = (page - 1) * perPage;

  const plantsQuery = Plant.find();

  if (type) {
    plantsQuery.where('type').equals(type);
  }

  const [totalPlants, plants] = await Promise.all([
    plantsQuery.clone().countDocuments(),
    plantsQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalPlants / perPage);

  res.status(200).json({
    page,
    perPage,
    totalPages,
    totalPlants,
    plants,
  });
};

export const getPlantById = async (req, res) => {
  const { plant_id } = req.params;

  const plant = await Plant.findOne({ _id: plant_id });

  if (!plant) {
    throw createHttpError(404, 'Not found flower');
  }

  res.status(200).json(plant);
};

export const createPlant = async (req, res) => {
  const { user, file } = req;

  if (user.role === 'customer') {
    throw createHttpError(403, 'Not wvailable function');
  }

  if (!file) {
    throw createHttpError(400, 'No file ');
  }

  const result = await saveFileToCloudinary(req.file.buffer, user._id);
  const productImage = result.secure_url;

  const plant = await Plant.create({
    ...req.body,
    productImage,
    sellerId: user._id,
    rating: 0,
    state: 'active',
  });

  res.status(201).json(plant);
};

export const updatePlant = async (req, res) => {
  const { plant_id } = req.params;

  const data = { ...req.body };

  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer, req.user._id);
    data.productImage = result.secure_url;
  }

  const plant = await Plant.findOneAndUpdate(
    { _id: plant_id, sellerId: req.user._id },
    data,
    { returnDocument: 'after' },
  );

  if (!plant) {
    throw createHttpError(404, 'Plant not found');
  }

  res.status(200).json(plant);
};

export const deletePlant = async (req, res) => {
  const { plant_id } = req.params;

  const plant = await Plant.findOneAndDelete({
    _id: plant_id,
    sellerId: req.user._id,
  });

  if (!plant) {
    throw createHttpError(404, 'Not found plant');
  }

  await Bouquet.updateMany(
    {
      'flowers.plantId': plant_id,
    },
    { state: 'archived' },
  );

  res.status(200).json(plant);
};
