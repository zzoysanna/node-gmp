import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { secret } from '../utils';

export const authorizeHandler = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = request.headers['x-access-token'];
  if (!token) {
    return response.status(401).send({
      success: false,
      message: 'No token provided',
    });
  }
  return jwt.verify(String(token), secret, (err: unknown) => {
    if (err) {
      return response.status(401).send({
        success: false,
        message: 'Failed to authenticate',
      });
    }
    return next();
  });
};

export default authorizeHandler;
