import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verify = (req, res, next) => {

  const authorizationHeader = req.headers['authorization'];

  if (authorizationHeader) {
    const tokenParts = authorizationHeader.split(' ');
    
    if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
      const token = req.cookies.accessToken;
       
      if (!token) return next(errorHandler(401, 'Unauthorized'));

      jwt.verify(token, 'midhun@2023', (err, user) => {
        if (err) {
          return next(errorHandler(403, 'Forbidden'));
        }

        req.user = user;
        next();
      });
    }
  } else {
    return next(errorHandler(401, 'Unauthorized'));
  }
};
