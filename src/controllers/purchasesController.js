import createHttpError from 'http-errors';
import { Purchase } from '../models/purchases.js';
import { Plant } from '../models/plants.js';
import { Bouquet } from '../models/bouquets.js';
import { Order } from '../models/orders.js';

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
  let products = req.body;

  const ids = products.map((product) => product.productId);

  const [plants, bouquets] = await Promise.all([
    Plant.find({ _id: { $in: ids } }).select(
      'name price sellerId productImage',
    ),
    Bouquet.find({ _id: { $in: ids } }).select(
      'name price flowers sellerId productImage',
    ),
  ]);

  const found = [...plants, ...bouquets];

  if (found.length !== products.length) {
    throw createHttpError(400, 'Product not found');
  }

  const items = products.map((item) => {
    const { _id, name, price, sellerId, productImage } = found.find((product) =>
      product._id.equals(item.productId),
    );
    return {
      productId: _id,
      name,
      price,
      amount: item.amount,
      sellerId,
      productImage,
    };
  });

  const needs = {};

  for (const item of items) {
    const bouquet = bouquets.find((b) => b._id.equals(item.productId));

    if (bouquet) {
      for (const flower of bouquet.flowers) {
        needs[flower.plantId] =
          (needs[flower.plantId] || 0) + flower.amount * item.amount;
      }
    } else {
      needs[item.productId] = (needs[item.productId] || 0) + item.amount;
    }
  }

  const stock = await Plant.find({ _id: { $in: Object.keys(needs) } }).select(
    'name amount',
  );

  for (const plant of stock) {
    if (plant.amount < needs[plant._id]) {
      throw createHttpError(400, `Too much ${plant.name} in stock`);
    }
  }

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.amount,
    0,
  );

  const purchase = await Purchase.create({
    products: items,
    totalProducts: items.length,
    totalPrice,
    userId: req.user._id,
  });

  const bySeller = {};

  for (let item of items) {
    (bySeller[item.sellerId] ??= []).push(item);
  }

  await Order.insertMany(
    Object.entries(bySeller).map(([sellerId, sellerProducts]) => ({
      sellerId,
      customerId: req.user._id,
      purchaseId: purchase._id,
      products: sellerProducts,
      totalProducts: sellerProducts.length,
      totalPrice: sellerProducts.reduce(
        (sum, product) => sum + product.price * product.amount,
        0,
      ),
    })),
  );

  for (const [plantId, qty] of Object.entries(needs)) {
    await Plant.updateOne({ _id: plantId }, { $inc: { amount: -qty } });
  }

  res.status(201).json(purchase);
};

export const deletePurchase = async (req, res) => {
  const { purchase_id } = req.params;

  const purchase = await Purchase.findOneAndUpdate(
    { _id: purchase_id, userId: req.user._id, status: 'pending' },
    { status: 'cancelled' },
    { returnDocument: 'after' },
  );

  if (!purchase) {
    throw createHttpError(400, 'Not found purchase');
  }

  await Order.updateOne({ purchaseId: purchase_id }, { status: 'cancelled' });

  res.status(200).json(purchase);
};
