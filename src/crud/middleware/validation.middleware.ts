import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { User, ErrorObject } from '../types';

const errorResponse = (schemaErrors: Joi.ValidationErrorItem[]): ErrorObject => ({
  status: 'failed',
  errors: schemaErrors.map((error: Joi.ValidationErrorItem) => {
    const { path, message } = error;
    return { path, message };
  }),
});

export const validateSchema = (
  schema: Joi.ObjectSchema<User>,
) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (error?.isJoi !== undefined) {
    next(errorResponse(error.details));
  } else {
    next();
  }
};

export default validateSchema;
