import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        name: {
          type: String,
          trim: true,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
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
    // state: {
    //   type: String,
    //   valid: ORDER_STATES,
    //   default: 'pending',
    //   required: true,
    // },
  },
  { timestamps: true },
);

export const Order = model('Order', orderSchema);
