import express from 'express';
import {
  applyDiscount,
  createCoupon,
  createPaymentIntent,
  deleteCoupon,
  getAllCoupons,
} from '../controllers/paymentController.js';
import { appendFile } from 'fs';
import { adminOnly } from '../middlewares/auth.js';

const router = express.Router();

//route - /api/v1/payment/create

router.post('/create', createPaymentIntent);

//route -  /api/v1/payment/discount
router.get('/discount', applyDiscount);

//route -  /api/v1/payment/coupon/new
router.post('/coupon/new', adminOnly, createCoupon);

//route -  /api/v1/payment/coupon/all
router.get('/coupon/all', adminOnly, getAllCoupons);

//route -  /api/v1/payment/coupon/id
router.delete('/coupon/:id', adminOnly, deleteCoupon);

export default router;
