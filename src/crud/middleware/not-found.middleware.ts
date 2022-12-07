import { Request, Response, NextFunction } from 'express';
import { getErrorMessage } from '../utils';

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  response.status(404).json(getErrorMessage('Resource not found'));
};

export default notFoundHandler;
