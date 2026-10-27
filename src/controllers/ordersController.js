import createHttpError from 'http-errors';
import { Order } from '../models/orders.js';

export const getAllOrders = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;

  const skip = (page - 1) * perPage;

  const orderQuery = Order.find({ sellerId: req.user._id });

  const [totalOrders, orders] = await Promise.all([
    orderQuery.clone().countDocuments(),
    orderQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalOrders / perPage);

  res.status(200).json({
    page,
    perPage,
    orders,
    totalOrders,
    totalPages,
  });
};

export const getOrderById = async (req, res) => {
  const { order_id } = req.params;

  const order = await Order.findOne({ _id: order_id, sellerId: req.user._id });

  if (!order) {
    throw createHttpError(404, 'Not found order');
  }

  res.status(200).json(order);
};

// export const updateOrderStatus = async (req, res) => {
//   const { order_id } = req.params;
//   const { status } = req.body;

//   const order = await Order.findOneAndUpdate(
//     { _id: order_id, sellerId: req.user._id, status: 'pending' },
//     { status },
//     { returnDocument: 'after' },
//   );

//   if (!order) {
//     throw createHttpError(404, 'Nor found order');
//   }

//   // if(status === "completed"){
//   //   for(const product of order.products){

//   //   }
//   // }

//   await Purchase.updateOne({ _id: order_id }, { status });

//   res.status(200).json(order);
// };
