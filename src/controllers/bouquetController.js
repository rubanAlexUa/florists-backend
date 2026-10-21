import { Bouquet } from '../models/bouquet.js';

export const getAllBouquets = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;

  const skip = (page - 1) * perPage;

  const bouquetsQuery = Bouquet.find();

  const [totalBouquets, bouquets] = await Promise.all([
    bouquetsQuery.clone().countDocuments(),
    bouquetsQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalBouquets / perPage);

  res.status(200).json({
    page,
    perPage,
    totalPages,
    totalBouquets,
    bouquets,
  });
};
