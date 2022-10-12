import { Request, Response } from 'express'
import Joi from 'joi'
import { User, ErrorObject } from '../models'

const errorResponse = (schemaErrors: Joi.ValidationErrorItem[]): ErrorObject => {
  return {
    status: 'failed',
    errors: schemaErrors.map((error: Joi.ValidationErrorItem) => {
      const { path, message } = error
      return { path, message }
    })
  }
}

export const validateSchema = (schema: Joi.ObjectSchema<User>) => {
  return (req: Request, res: Response, next: Function) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    })
    if (error?.isJoi !== undefined) {
      res.status(400).json(errorResponse(error.details))
    } else {
      next()
    }
  }
}
