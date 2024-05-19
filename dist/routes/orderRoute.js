import express from 'express';
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, processOrder, } from '../controllers/orderController.js';
import { adminOnly, loggedInOnly } from '../middlewares/auth.js';
const router = express.Router();
//route - /api/v1/order/new
router.post('/new', loggedInOnly, newOrder);
//route - /api/v1/order/my
router.get('/my', loggedInOnly, myOrders);
//route - /api/v1/order/all
router.get('/all', loggedInOnly, adminOnly, allOrders);
//route - /api/v1/order/:id
router
    .route('/:id')
    .get(loggedInOnly, getSingleOrder)
    .put(loggedInOnly, adminOnly, processOrder)
    .delete(loggedInOnly, adminOnly, deleteOrder);
export default router;
