import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  static async searchUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { loginSubstring, limit } = req.query;
    UserService.getAutoSuggestUsers(
      loginSubstring ? String(loginSubstring) : '',
      limit,
    )
      .then((users) => res.status(200).json(users))
      .catch(next);
  }

  static async createNewUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    UserService.addNewUser(req.body)
      .then((newUser) => res.status(200).json(newUser.id))
      .catch(next);
  }

  static async findUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    UserService.findUserById(id)
      .then((currentUser) => res.status(200).json(currentUser))
      .catch(next);
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    UserService.deleteUser(id)
      .then(() => res.sendStatus(200))
      .catch(next);
  }

  static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    UserService.updateUser(String(id), req.body)
      .then((result) => res.status(200).json(result))
      .catch(next);
  }
}
