import { Schema, model } from 'mongoose';
import { PRODUCTS_TYPES } from '../constants/productsTypes.js';
import { PRODUCTS_STATES } from '../constants/productStates.js';

export const plantSchema = new Schema({
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
  amount: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: PRODUCTS_TYPES,
    required: true,
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  state: {
    type: String,
    enum: PRODUCTS_STATES,
    required: true,
  },
});

plantSchema.index({ type: 1 });

export const Plant = model('Plant', plantSchema);
