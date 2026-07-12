const jwt = require('jsonwebtoken');

// Middleware to protect routes and verify user identity
const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } 
    // 2. Check cookies as fallback
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, please login first' });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey123');

    // 4. Attach user details to request object
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    // 5. Move to next handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, invalid or expired token' });
  }
};

module.exports = protect;
