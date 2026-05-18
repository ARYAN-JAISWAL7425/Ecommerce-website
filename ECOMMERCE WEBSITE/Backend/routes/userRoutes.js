import express from 'express';
import { registerUser, loginUser, getUserProfile, adminLogin } from '../controllers/userController.js';


const userRouter = express.Router();

// User registration route
userRouter.post('/register', registerUser);

// User login route
userRouter.post('/login', loginUser);

// Admin login route
userRouter.post('/admin/login', adminLogin);

// User profile route
userRouter.get('/profile', getUserProfile);

export default userRouter;