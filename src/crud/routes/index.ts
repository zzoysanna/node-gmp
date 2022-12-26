import express from 'express';
import userRouter from './user.routes';
import groupRouter from './group.routes';
import authRouter from './auth.routes';
import { authorizeHandler } from '../middleware';

const subroutes = express.Router();

subroutes.use('/auth', authRouter);
subroutes.use('/users', authorizeHandler, userRouter);
subroutes.use('/groups', authorizeHandler, groupRouter);

export default subroutes;
