import { Product } from '../models/product.js';
import { OrderItemType } from '../types/orderType.js';

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const orderItem = orderItems[i];
    const product = await Product.findById(orderItem.productId);

    if (!product) {
      throw new Error('Product not found');
    }
    product.stock -= orderItem.quantity;
    await product.save();
  }
};
