const jwt = require('jsonwebtoken');
const apiResponse = require('../utils/apiResponse');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return apiResponse.unauthorized(res, 'No authentication token, access denied');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user info from payload
    req.user = decoded;
    req.userId = decoded.id;
    next();
    
  } catch (error) {
    return apiResponse.unauthorized(res, 'Token is not valid');
  }
};

module.exports = auth;
