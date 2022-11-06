import { Request, Response } from 'express';
import GroupService from '../services/group.service';

export default class GroupController {
  static async getAllGroups(req: Request, res: Response): Promise<void> {
    const groups = await GroupService.getAllGroups();
    res.status(200).json(groups);
  }

  static async findGroup(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const currentGroup = await GroupService.findGroupById(id);
      res.status(200).json(currentGroup);
    } catch (e: unknown) {
      res.status(404).send((e as Error).message);
    }
  }

  static async createGroup(req: Request, res: Response): Promise<void> {
    const newGroup = await GroupService.addNewGroup(req.body);
    res.status(200).json(newGroup.id);
  }

  static async deleteGroup(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const result = await GroupService.deleteGroup(id);
      if (result) {
        res.sendStatus(200);
      }
    } catch (e: unknown) {
      res.status(404).send((e as Error).message);
    }
  }

  static async updateGroup(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const result = await GroupService.updateGroup(id, req.body);
      if (result) {
        res.status(200).json(result);
      }
    } catch (e: unknown) {
      res.status(404).send((e as Error).message);
    }
  }

  static async addToGroup(req: Request, res: Response): Promise<void> {
    const { groupId, userIds } = req.body;
    try {
      await GroupService.addUsersToGroup(groupId, userIds);
      res.sendStatus(200);
    } catch (e: unknown) {
      res.status(404).send((e as Error).message);
    }
  }
}
