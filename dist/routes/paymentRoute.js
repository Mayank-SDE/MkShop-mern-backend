import express from 'express';
import { applyDiscount, createCoupon, createPaymentIntent, deleteCoupon, getAllCoupons, } from '../controllers/paymentController.js';
import { adminOnly, loggedInOnly } from '../middlewares/auth.js';
const router = express.Router();
//route - /api/v1/payment/create
router.post('/create', loggedInOnly, createPaymentIntent);
//route -  /api/v1/payment/discount
router.get('/discount', loggedInOnly, applyDiscount);
//route -  /api/v1/payment/coupon/new
router.post('/coupon/new', loggedInOnly, adminOnly, createCoupon);
//route -  /api/v1/payment/coupon/all
router.get('/coupon/all', loggedInOnly, getAllCoupons);
//route -  /api/v1/payment/coupon/:id
router.delete('/coupon/:id', loggedInOnly, adminOnly, deleteCoupon);
export default router;
