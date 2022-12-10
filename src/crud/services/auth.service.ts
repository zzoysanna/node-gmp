import jwt from 'jsonwebtoken';
import { Loggable, secret } from '../utils';
import UserService from './user.service';

@Loggable()
export default class AuthService {
  static async login(username: string, password: string): Promise<string | null> {
    const user = await UserService.findUserByLogin(username);
    if (user && user.login === username && user.password === password) {
      const payload = {
        sub: user.id,
        title: user.login,
      };
      const token = jwt.sign(payload, secret, { expiresIn: 120 });
      return token;
    }
    return null;
  }
}
