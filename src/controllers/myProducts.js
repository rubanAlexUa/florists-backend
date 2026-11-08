import createHttpError from 'http-errors';
import { Plant } from '../models/plants.js';
import { Bouquet } from '../models/bouquets.js';

export const getAllMyProducts = async (req, res) => {
  const { user } = req;

  if (user.role !== 'seller') {
    throw createHttpError(400, 'Role is not seller');
  }

  const [plants, bouquets] = await Promise.all([
    Plant.find({ sellerId: user._id }).lean(),
    Bouquet.find({ sellerId: user._id }).lean(),
  ]);

  const products = [
    ...plants,
    ...bouquets.map((bouquet) => ({ ...bouquet, type: 'bouquet' })),
  ].sort((a, b) => b._id.toString().localeCompare(a._id.toString()));

  res.status(200).json(products);
};
