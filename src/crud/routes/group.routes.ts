import express from 'express';
import GroupController from '../controllers/group.controller';

const router = express.Router();

router.post('/createGroup', GroupController.createGroup);

router.get('/group/:id', GroupController.findGroup);

router.get('/getAllGroups', GroupController.getAllGroups);

router.put('/group/:id', GroupController.updateGroup);

router.delete('/group/:id', GroupController.deleteGroup);

export default router;
