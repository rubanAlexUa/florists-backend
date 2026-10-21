import { Schema, model } from 'mongoose';
import { PRODUCTS_TYPES } from '../constants/productsTypes.js';

export const plantSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  description: {
    type: String,
    trim: true,
    require: true,
  },
  price: {
    type: Number,
    trim: true,
    require: true,
  },
  amount: {
    type: Number,
    trim: true,
    require: true,
  },
  rating: {
    type: Number,
    trim: true,
    require: true,
  },
  type: {
    type: String,
    enum: PRODUCTS_TYPES,
  },
});

plantSchema.index({ type: 1 });

export const Plant = model('Plant', plantSchema);
