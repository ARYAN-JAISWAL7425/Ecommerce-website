import express from 'express';
import { placeOrder, placeOrderRazorpay, allOrders, userOrders, updateOrder, placeOrderStripe, verifyStripe, verifyRazorpay } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminauth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateOrder);
orderRouter.post('/getallorders', adminAuth, allOrders);
orderRouter.post('/updateorder', adminAuth, updateOrder);

// Payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/place-razorpay', authUser, placeOrderRazorpay);
orderRouter.post('/place-stripe', authUser, placeOrderStripe);

// User Features
orderRouter.post('/userorders', authUser, userOrders);
orderRouter.post('/user', authUser, userOrders);

// Verify Stripe Payment
orderRouter.post('/verifyStripe', authUser, verifyStripe);
// Verify Razorpay Payment
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

export default orderRouter;