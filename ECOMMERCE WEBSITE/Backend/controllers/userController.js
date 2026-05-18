import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id) => {

    // Token creation logic here

    return jwt.sign({ id }, process.env.JWT_SECRET);

};

// Route for user login
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const token = createToken(user._id);
        res.json({ success: true, message: 'User login successful', token });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// Route for user registration
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Validate email format using validator
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
        }
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);   
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        
        const User = await newUser.save();

        const token = createToken(User._id);

        res.json({ success: true, message: 'User registered successfully', token });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }





       
}

// Route for user profile
const getUserProfile = async (req, res) => {
    res.json({ success: true, message: 'User profile data' });
}




// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email: email, password: password }, process.env.JWT_SECRET);
            res.json({ success: true, message: 'Admin login successful', token });
        } else {
            res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export { loginUser, registerUser, getUserProfile, adminLogin };