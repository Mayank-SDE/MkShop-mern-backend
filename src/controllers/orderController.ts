import { NextFunction, Request, Response } from 'express';
import { NewOrderRequestBody } from '../types/orderType.js';
import { Order } from '../models/order.js';
import { reduceStock } from '../utils/reduceStock.js';
import { invalidateCache } from '../utils/invalidateCache.js';
import ErrorHandler from '../utils/utilityClass.js';
import { nodeCache } from '../app.js';

export const newOrder = async (
  request: Request<{}, {}, NewOrderRequestBody>,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      shippingInfo,
      user,
      status,
      tax,
      shippingCharges,
      subTotal,
      total,
      discount,
      orderItems,
    } = request.body;
    console.log(orderItems);

    if (
      !shippingInfo ||
      !user ||
      !status ||
      !tax ||
      !subTotal ||
      !total ||
      !orderItems
    ) {
      return next(new ErrorHandler('Please enter all the fields', 400));
    }

    await Order.create({
      shippingInfo,
      user,
      status,
      tax,
      shippingCharges,
      subTotal,
      total,
      discount,
      orderItems,
    });

    await reduceStock(orderItems);
    invalidateCache({
      product: true,
      order: true,
      admin: true,
      userId: user,
      productId: orderItems.map((orderItem) => String(orderItem.productId)),
    });
    return response.status(201).json({
      success: true,
      message: 'Order placed successfully.',
    });
  } catch (error) {
    return next(error);
  }
};

export const myOrders = async (
  request: Request<{}, {}, {}, { userId: string }>,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.query.userId;
    const key = `orders-${id}`;
    let orders = [];
    if (nodeCache.has(key)) {
      orders = JSON.parse(nodeCache.get(key) as string);
    } else {
      orders = await Order.find({ user: id });
      nodeCache.set(key, JSON.stringify(orders));
    }
    return response.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(error);
  }
};

export const allOrders = async (
  request: Request<{}, {}, {}, { id: string }>,
  response: Response,
  next: NextFunction
) => {
  try {
    const key = 'all-orders';
    let orders = [];
    if (nodeCache.has(key)) {
      orders = JSON.parse(nodeCache.get(key) as string);
    } else {
      orders = await Order.find({}).populate('user', 'name');
      nodeCache.set(key, JSON.stringify(orders));
    }
    return response.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(error);
  }
};

export const getSingleOrder = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.params;
    const key = `order-${id}`;
    let order;
    if (nodeCache.has(key)) {
      order = JSON.parse(nodeCache.get(key) as string);
    } else {
      order = await Order.findById(id);
      if (!order) {
        return next(new ErrorHandler('Order not found', 404));
      }
      nodeCache.set(key, JSON.stringify(order));
    }

    return response.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(error);
  }
};

export const processOrder = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.params;
    const order = await Order.findById(id);
    if (!order) {
      return next(new ErrorHandler('Order not found', 404));
    }
    switch (order.status) {
      case 'Placed':
        order.status = 'Picked';
        break;
      case 'Picked':
        order.status = 'Packed';
        break;
      case 'Packed':
        order.status = 'Shipped';
        break;
      default:
        order.status = 'Delivered';
        break;
    }

    await order.save();
    invalidateCache({
      product: false,
      order: true,
      admin: true,
      userId: order.user as string,
      orderId: String(order._id),
    });
    return response
      .status(201)
      .json({ success: true, message: 'Order processed successfully' });
  } catch (error) {
    return next(error);
  }
};

export const deleteOrder = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.params;
    const order = await Order.findById(id);
    if (!order) {
      return next(new ErrorHandler('Order not found', 404));
    }

    await order.deleteOne();
    invalidateCache({
      product: false,
      order: true,
      admin: true,
      userId: order.user as string,
      orderId: String(order._id),
    });
    return response
      .status(202)
      .json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
