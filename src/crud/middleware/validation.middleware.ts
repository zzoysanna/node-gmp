import { Request, Response } from 'express';
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
) => (req: Request, res: Response, next: Function) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (error?.isJoi !== undefined) {
    res.status(400).json(errorResponse(error.details));
  } else {
    next();
  }
};

export default validateSchema;
