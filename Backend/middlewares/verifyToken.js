import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

export const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user; // Attach user to request object 
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token', error: error.message });
    }
}