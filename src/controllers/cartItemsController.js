import { CartItem } from '../models/cartItems.js';

export const getAllCartsItems = async (req, res) => {
  const cartItems = await CartItem.find();

  res.status(200).json(cartItems);
};

export const createCartItem = async (req, res) => {
  const cartItem = await CartItem.create({ ...req.body });
  res.status(201).json(cartItem);
};
