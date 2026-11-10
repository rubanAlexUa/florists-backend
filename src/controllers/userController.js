import createHttpError from 'http-errors';
import { User } from '../models/user.js';

export const getUserById = async (req, res) => {
  const { user } = req;
  if (user.role != 'seller') {
    throw createHttpError(403, 'Forbidden');
  }

  const { customer_id } = req.params;

  const customer = await User.findById(customer_id);

  if (!customer) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({ customerName: customer.username });
};
