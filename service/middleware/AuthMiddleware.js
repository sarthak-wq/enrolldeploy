import jwt from 'jsonwebtoken';

// Middleware to authenticate JWT token from cookies
export const authenticateUser = (req, res, next) => {
  //Getting the token from the cookies
  const token = req.cookies.accessToken; 
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};
