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
      name: {
        type: String,
        trim: true,
        required: true,
      },
      amount: {
        type: Number,
        trim: true,
        required: true,
      },
      plantId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    },
  ],
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
});

export const Bouquet = model('Bouquet', bouquetSchema);
