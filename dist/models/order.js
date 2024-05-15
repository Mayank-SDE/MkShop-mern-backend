import mongoose from 'mongoose';
import validator from 'validator';
const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, 'Please enter your address'],
        },
        city: {
            type: String,
            required: [true, 'Please enter your city name.'],
        },
        country: {
            type: String,
            required: [true, 'Please enter your country name.'],
        },
        state: {
            type: String,
            required: [true, 'Please enter your state name.'],
        },
        pinCode: {
            type: Number,
            required: [true, 'Please enter your pincode'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Please enter your phone number.'],
        },
        email: {
            type: String,
            required: [true, 'Please enter your email address'],
            validate: validator.default.isEmail,
        },
        billingName: {
            type: String,
            required: [true, 'Please enter the billing name.'],
        },
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the user id.'],
    },
    subTotal: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
    shippingCharges: {
        type: Number,
        required: true,
        default: 0,
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['placed', 'picked', 'packed', 'shipped', 'delivered'],
        default: 'placed',
    },
    orderItems: [
        {
            title: String,
            price: Number,
            qunatity: Number,
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
            },
        },
    ],
}, {
    timestamps: true,
});
export const Order = mongoose.model('Order', orderSchema);
