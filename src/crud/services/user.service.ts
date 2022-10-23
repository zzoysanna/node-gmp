import { UserInput, UserDbFields } from '../types';
import * as userDal from '../db/user.dal';

export default class UserService {
  static async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<UserDbFields[]> {
    return userDal.getAll({ loginSubstring, limit });
  }

  static async findUserById(id: string): Promise<UserDbFields | undefined> {
    return userDal.getById(id);
  }

  static async addNewUser(userData: UserInput): Promise<UserDbFields> {
    return userDal.create(userData);
  }

  static async deleteUser(id: string): Promise<boolean> {
    return userDal.deleteById(id);
  }

  static async updateUser(id: string, userData: UserInput): Promise<UserDbFields> {
    return userDal.update(id, userData);
  }
}
