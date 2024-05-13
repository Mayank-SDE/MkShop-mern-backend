import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter the title of the product.'],
    },
    description: {
        type: String,
        required: [true, 'Please enter som description of your product.'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter your product price'],
    },
    discountPercentage: {
        type: Number,
        required: [true, 'Please enter the dicount percentage'],
    },
    rating: {
        type: Number,
        required: [true, 'Please enter your product rating.'],
    },
    stock: {
        type: Number,
        required: [true, 'Please enter the stock available of your product.'],
    },
    brand: {
        type: String,
        required: [true, 'Please enter the brand of the product.'],
    },
    category: {
        type: String,
        required: [true, 'Please the enter the category of your product.'],
        trim: true,
    },
    thumbnail: {
        type: String,
        required: [true, 'Please enter the thumbnail of your product'],
    },
    images: [
        {
            type: String,
        },
    ],
});
export const Product = mongoose.model('Product', productSchema);
