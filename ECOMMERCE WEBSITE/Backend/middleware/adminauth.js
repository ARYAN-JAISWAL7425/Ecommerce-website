import jwt from 'jsonwebtoken';

// Middleware to verify admin token
const adminAuth = async (req, res, next) => {
    try {
        const {token} = req.headers;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.email === process.env.ADMIN_EMAIL && decoded.password === process.env.ADMIN_PASSWORD) {
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

export default adminAuth;