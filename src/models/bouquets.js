import { Schema, model } from 'mongoose';
import { PRODUCTS_STATES } from '../constants/productStates.js';

const bouquetSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  flowers: [
    {
      amount: {
        type: Number,
        min: 1,
        required: true,
      },
      plantId: {
        type: Schema.Types.ObjectId,
        ref: 'Plant',
        required: true,
      },
    },
  ],
  rating: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    enum: PRODUCTS_STATES,
    required: true,
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
});

export const Bouquet = model('Bouquet', bouquetSchema);
