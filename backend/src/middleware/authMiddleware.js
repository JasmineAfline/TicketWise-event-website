const jwt = require('jsonwebtoken');
const User = require('../models/User'); // your User model

// Protect routes - check if user is logged in
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Admin or Employee middleware
const adminOrEmployee = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'employee')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};

module.exports = { protect, adminOrEmployee };
