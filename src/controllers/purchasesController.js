import createHttpError from 'http-errors';
import { Purchase } from '../models/purchases.js';

export const getAllPurchases = async (req, res) => {
  const purchases = await Purchase.find({ userId: req.user._id });

  res.status(200).json(purchases);
};

export const getPurchaseById = async (req, res) => {
  const { purchase_id } = req.params;
  const purchase = await Purchase.findOne({
    _id: purchase_id,
    userId: req.user._id,
  });

  if (!purchase) {
    throw createHttpError(404, 'Not found purchase');
  }

  res.status(200).json(purchase);
};

export const createPurchase = async (req, res) => {
  const purchase = await Purchase.create({ ...req.body, userId: req.user._id });
  res.status(201).json(purchase);
};
