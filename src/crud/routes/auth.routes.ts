import express from 'express';
import AuthController from '../controllers/auth.controller';
import Joi from 'joi';
import * as Validation from '../middleware';
import {AuthData} from '../types';

const router = express.Router();

const authSchema: Joi.ObjectSchema<AuthData> = Joi.object().keys({
    userName: Joi.string().alphanum().required(),
    password: Joi.string().required(),
});

router.post('/', Validation.validateSchema<AuthData>(authSchema), AuthController.authenticate);

export default router;
