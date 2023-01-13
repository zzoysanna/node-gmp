import express from 'express';
import Joi from 'joi';
import UserController from '../controllers/user.controller';
import * as Validation from '../middleware';
import { User } from '../types';

const router = express.Router();

const userSchema: Joi.ObjectSchema<User> = Joi.object().keys({
  login: Joi.string().alphanum().required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
  age: Joi.number().integer().min(4).max(130)
    .required(),
});

router.post('/create', Validation.validateSchema<User>(userSchema), UserController.createNewUser);

router.get('/user/:id', UserController.findUser);

router.put('/user/:id', Validation.validateSchema<User>(userSchema), UserController.updateUser);

router.delete('/user/:id', UserController.deleteUser);

router.get('/search', UserController.searchUsers);

export default router;
