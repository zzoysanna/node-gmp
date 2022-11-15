import { Request, Response, NextFunction } from 'express';
import GroupService from '../services/group.service';

export default class GroupController {
  static async getAllGroups(req: Request, res: Response, next: NextFunction): Promise<void> {
    GroupService.getAllGroups()
      .then((groups) => res.status(200).json(groups))
      .catch(next);
  }

  static async findGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    GroupService.findGroupById(id)
      .then((currentGroup) => res.status(200).json(currentGroup))
      .catch(next);
  }

  static async createGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    GroupService.addNewGroup(req.body)
      .then((newGroup) => res.status(200).json(newGroup.id))
      .catch(next);
  }

  static async deleteGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    GroupService.deleteGroup(id)
      .then(() => res.sendStatus(200))
      .catch(next);
  }

  static async updateGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    GroupService.updateGroup(id, req.body)
      .then((result) => res.status(200).json(result))
      .catch(next);
  }

  static async addToGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { groupId, userIds } = req.body;
    GroupService.addUsersToGroup(groupId, userIds)
      .then(() => res.sendStatus(200))
      .catch(next);
  }
}
