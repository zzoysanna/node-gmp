import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth.service';

export default class AuthController {
  static authenticate(req: Request, res: Response, next: NextFunction): void {
    const { userName, password } = req.body;
    AuthService.login(userName, password)
      .then((token) => {
        token
          ? res.send(token)
          : res.status(401).send({
            success: false,
            message: 'Bad username/password combination',
          });
      })
      .catch(next);
  }
}
