import express from "express";
import { addToCart, updateUserCart, getUserCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.get('/get', authUser, getUserCart);
cartRouter.post('/get', authUser, getUserCart);

cartRouter.post('/add', authUser, addToCart);

cartRouter.put('/update', authUser, updateUserCart);
cartRouter.post('/update', authUser, updateUserCart);

export default cartRouter;

