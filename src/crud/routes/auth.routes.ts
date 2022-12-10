import express from 'express';
import AuthController from '../controllers/auth.controller';

const router = express.Router();

router.post('/', AuthController.authenticate);

export default router;
