const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Verify if the user is already logged in
const verifyToken = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');
            next();

        } catch (error) {
            console.error(error);
            return res.status(401).json({message: 'Not authorized, token failed'}); 
        }
    }

    if (!token) {
        return res.status(401).json({message: 'Not authorized, no token'}); 
    }
}; 

module.exports = verifyToken;