import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import cloudinaryConfig from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';


const app = express();
const PORT = process.env.PORT || 5000;
connectDB();   
await cloudinaryConfig(); 

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
    res.send('API is working!')
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
