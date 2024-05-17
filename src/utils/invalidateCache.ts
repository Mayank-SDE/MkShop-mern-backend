import { nodeCache } from '../app.js';
import { Order } from '../models/order.js';
import { Product } from '../models/product.js';
import { User } from '../models/user.js';
import { InvalidateCache } from '../types/productType.js';

export const invalidateCache = ({
  product,
  order,
  admin,
  userId,
  orderId,
  productId,
}: InvalidateCache) => {
  if (product) {
    let productKeys: string[] = [
      'products',
      'brands',
      'categories',
      'latest-products',
    ];

    if (typeof productId === 'string') {
      productKeys.push(`product-${productId}`);
    }
    if (typeof productId === 'object') {
      productId.forEach((id) => {
        productKeys.push(`product-${id}`);
      });
    }
    nodeCache.del(productKeys);
  }
  if (order) {
    let orderKeys: string[] = [
      'all-orders',
      `order-${orderId}`,
      `orders-${userId}`,
    ];

    nodeCache.del(orderKeys);
  }
  if (admin) {
    const adminKeys = [
      'admin-stats',
      'admin-pie-chart',
      'admin-bar-chart',
      'admin-line-chart',
    ];

    nodeCache.del(adminKeys);
  }
};
