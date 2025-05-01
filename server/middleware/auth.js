const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  console.log('Token:', token); // Debugging log for token

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Payload:', decoded); // Debugging log for decoded payload
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token validation error:', err.message); // Debugging log for validation error
    res.status(401).json({ msg: 'Token is not valid' });
  }
};