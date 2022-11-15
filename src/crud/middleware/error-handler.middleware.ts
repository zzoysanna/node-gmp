import { Request, Response, NextFunction } from 'express';
import { getErrorMessage } from '../utils';
import { ErrorObject } from '../types';

export const clientErrorHandler = (
  error: ErrorObject,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const status = error.statusCode || Number(error.status) || 500;
  response.status(status).send(getErrorMessage(error));
};
export default clientErrorHandler;
