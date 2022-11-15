import { Request, Response, NextFunction } from 'express';
import { getErrorMessage } from '../utils';
import { ErrorObject } from '../types';
import logger from '../utils/logger';

export const clientErrorHandler = (
  error: ErrorObject,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const status = error.statusCode || Number(error.status) || 500;
  logger.error(
    `${request.method} ${request.url} failed. `
      + `Error status code ${status}, error message "${getErrorMessage(error).message}"`,
  );
  response.status(status).send(error);
};
export default clientErrorHandler;
