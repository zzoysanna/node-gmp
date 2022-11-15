import express from 'express';
import userRouter from './user.routes';
import groupRouter from './group.routes';

const subroutes = express.Router();

subroutes.use('/users', userRouter);
subroutes.use('/groups', groupRouter);

export default subroutes;
