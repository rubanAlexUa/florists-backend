import createHttpError from 'http-errors';
import { Plant } from '../models/plants.js';

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
    throw createHttpError(401, 'Not found flower');
  }

  res.status(200).json(plant);
};
