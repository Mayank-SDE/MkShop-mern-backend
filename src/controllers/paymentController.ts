import { NextFunction, Request, Response } from 'express';
import { Coupon } from '../models/coupon.js';
import ErrorHandler from '../utils/utilityClass.js';
import { stripe } from '../app.js';

export const createPaymentIntent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { amount, discount } = request.body;
    if (!amount) {
      return next(new ErrorHandler('Please enter the amount.', 400));
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: 'inr',
    });

    return response.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      discount,
    });
  } catch (error) {
    return next(error);
  }
};
export const createCoupon = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { coupon, amount } = request.body;

    if (!coupon || !amount) {
      return next(new ErrorHandler('Please enter both coupon and amount', 400));
    }

    await Coupon.create({
      coupon,
      amount,
    });

    return response.status(201).json({
      success: true,
      message: `Coupon ${coupon} created successfully`,
    });
  } catch (error) {
    return next(error);
  }
};

export const applyDiscount = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { coupon } = request.query;

    const discount = await Coupon.findOne({ coupon });

    if (!discount) {
      return next(new ErrorHandler('Invalid coupon code', 400));
    }

    return response.status(200).json({
      success: true,
      discount: discount.amount,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllCoupons = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const coupons = await Coupon.find({});

    console.log(coupons);
    return response.status(200).json({
      success: true,
      coupons,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteCoupon = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.params;
    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) {
      return next(new ErrorHandler('Invalid coupon id.', 400));
    }

    return response.status(200).json({
      success: true,
      message: `Coupon ${coupon?.coupon} deleted successfully.`,
    });
  } catch (error) {
    return next(error);
  }
};
