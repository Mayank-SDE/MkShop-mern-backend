import { Product } from '../models/product.js';
export const reduceStock = async (orderItems) => {
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
