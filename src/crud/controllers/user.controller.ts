import UserMapper from '../mappers/user.mapper';
import UserService from '../services/user.service';
import { User, UserInput } from '../types';

export default class UserController {
  static async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<User[]> {
    const filteredUsers = await UserService.getAutoSuggestUsers(loginSubstring, limit);
    return filteredUsers.map((item) => UserMapper.toDomain(item));
  }

  static async findUserById(id: string): Promise<User | undefined> {
    const user = await UserService.findUserById(id);
    return user ? UserMapper.toDomain(user) : undefined;
  }

  static async addNewUser(userData: UserInput): Promise<User> {
    return UserMapper.toDomain(
      await UserService.addNewUser(userData),
    );
  }

  static async deleteUser(id: string): Promise<boolean> {
    return UserService.deleteUser(id);
  }

  static async updateUser(id: string, userData: UserInput): Promise<User> {
    return UserMapper.toDomain(
      await UserService.updateUser(id, userData),
    );
  }
}
