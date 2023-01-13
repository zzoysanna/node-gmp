import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ErrorObject } from '../types';

const errorResponse = (schemaErrors: Joi.ValidationErrorItem[]): ErrorObject => ({
  status: 'failed',
  errors: schemaErrors.map((error: Joi.ValidationErrorItem) => {
    const { path, message } = error;
    return { path, message };
  }),
});

export function validateSchema<T>(schema: Joi.ObjectSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const {error} = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });
    if (error?.isJoi !== undefined) {
      next(errorResponse(error.details));
    } else {
      next();
    }
  }
}

export default validateSchema;
