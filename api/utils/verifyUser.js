import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    next(errorHandler(401, 'Unauthorized'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      next(errorHandler(401, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};
