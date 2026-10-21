import { Schema, model } from 'mongoose';

const cartItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const CartItem = model('CartItem', cartItemSchema);
