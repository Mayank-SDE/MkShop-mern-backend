import { nodeCache } from '../app.js';
export const invalidateCache = ({ product, order, admin, userId, orderId, productId, }) => {
    if (product) {
        let productKeys = [
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
        let orderKeys = [
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
