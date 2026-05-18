import express from 'express';
import { listProducts, addProduct, removeProduct, singleProductDetails } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminauth from '../middleware/adminauth.js';

const productRouter = express.Router();

// Route to list all products
productRouter.get('/list', listProducts);

// Route to add a new product
productRouter.post('/add',adminauth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 },{ name: 'image4', maxCount: 1 }]), addProduct);

// Route to remove a product
productRouter.post('/remove',adminauth, removeProduct);

// Route to get details of a single product
productRouter.post('/single', singleProductDetails);

export default productRouter;