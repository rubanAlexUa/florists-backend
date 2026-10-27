import createHttpError from 'http-errors';
import { Bouquet } from '../models/bouquets.js';
import { Plant } from '../models/plants.js';
import { saveFileToCloudinary } from '../../utils/saveFileToCloudinary.js';

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

export const getBouquetById = async (req, res) => {
  const { bouquet_id } = req.params;

  const bouquet = await Bouquet.findOne({ _id: bouquet_id });

  if (!bouquet) {
    throw createHttpError(404, 'Not found flower');
  }

  res.status(200).json(bouquet);
};

export const createBouquet = async (req, res) => {
  if (req.user.role === 'customer') {
    throw createHttpError(403, 'Not available function ');
  }

  const { flowers } = req.body;
  const { file } = req;

  if (!file) {
    throw createHttpError(400, 'No file ');
  }

  let price = 100;

  for (const flower of flowers) {
    const plant = await Plant.findOne({
      sellerId: req.user._id,
      _id: flower.plantId,
    });

    if (!plant) {
      throw createHttpError(400, 'Not such flower');
    }

    price += plant.price * flower.amount;
  }

  const result = await saveFileToCloudinary(req.file.buffer, req.user._id);
  const productImage = result.secure_url;

  const bouquet = await Bouquet.create({
    ...req.body,
    productImage,
    price,
    sellerId: req.user._id,
  });

  res.status(201).json(bouquet);
};

export const updateBouquet = async (req, res) => {
  const { bouquet_id } = req.params;

  const data = { ...req.body };

  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer, req.user._id);
    data.productImage = result.secure_url;
  }

  const bouquet = await Bouquet.findOneAndUpdate(
    {
      _id: bouquet_id,
      sellerId: req.user._id,
    },
    data,
    { returnDocument: 'after' },
  );

  if (!bouquet) {
    throw createHttpError(404, 'Not find bouquet');
  }

  res.status(200).json(bouquet);
};

export const deleteBouquet = async (req, res) => {
  const { bouquet_id } = req.params;

  const bouquet = await Bouquet.findOneAndDelete({
    _id: bouquet_id,
    sellerId: req.user._id,
  });

  if (!bouquet) {
    throw createHttpError(404, 'Not found bouquet');
  }

  res.status(200).json(bouquet);
};
