import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  static async searchUsers(req: Request, res: Response): Promise<void> {
    const { loginSubstring, limit } = req.query;
    try {
      const users = await UserService.getAutoSuggestUsers(
        loginSubstring ? String(loginSubstring) : '',
        limit,
      );
      res.status(200).json(users);
    } catch (e: unknown) {
      res.status(404).send((e as Error).message);
    }
  }

  static async createNewUser(req: Request, res: Response): Promise<void> {
    const newUser = await UserService.addNewUser(req.body);
    res.status(200).json(newUser.id);
  }

  static async findUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const currentUser = await UserService.findUserById(id);
      res.status(200).json(currentUser);
    } catch (e: unknown) {
      res.status(404).send((e as Error).message);
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const result = await UserService.deleteUser(id);
      if (result) {
        res.sendStatus(200);
      }
    } catch (e: unknown) {
      res.status(404).send((e as Error).message);
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const result = await UserService.updateUser(String(id), req.body);
      if (result) {
        res.status(200).json(result);
      }
    } catch (e: unknown) {
      res.status(404).send((e as Error).message);
    }
  }
}
