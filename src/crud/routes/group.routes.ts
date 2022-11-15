import express from 'express';
import GroupController from '../controllers/group.controller';

const router = express.Router();

router.post('/create', GroupController.createGroup);

router.get('/group/:id', GroupController.findGroup);

router.get('/getAll', GroupController.getAllGroups);

router.put('/group/:id', GroupController.updateGroup);

router.delete('/group/:id', GroupController.deleteGroup);

router.post('/addUsersToGroup', GroupController.addToGroup);

export default router;
