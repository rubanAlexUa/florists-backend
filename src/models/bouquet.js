import { Schema, model } from 'mongoose';
import { plantSchema } from './plants.js';

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
    trim: true,
    required: true,
  },
  flowers: [plantSchema],
});

export const Bouquet = model('Bouquet', bouquetSchema);
