import { Schema, model } from 'mongoose';

const purchaseSchema = new Schema(
  {
    products: [
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
          min: 1,
          required: true,
        },
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
    totalProducts: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const Purchase = model('Purchase', purchaseSchema);
