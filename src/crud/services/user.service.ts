import { UserInput, User } from '../types';
import UserMapper from '../mappers/user.mapper';
import * as userDal from '../db/user.dal';
import { Loggable } from '../utils';

const DEFAILT_LIMIT = 5;

@Loggable()
export default class UserService {
  static async getAutoSuggestUsers(loginSubstring: string, limit?: unknown): Promise<User[]> {
    const filteredUsers = await userDal.getAll({
      loginSubstring,
      limit: limit !== undefined ? Number(limit) : DEFAILT_LIMIT,
    });
    return filteredUsers.map((item) => UserMapper.toDomain(item));
  }

  static async findUserById(id: string): Promise<User | undefined> {
    const user = await userDal.getById(id);
    return user ? UserMapper.toDomain(user) : undefined;
  }

  static async findUserByLogin(name: string): Promise<User | undefined> {
    const user = await userDal.findByName(name);
    return user ? UserMapper.toDomain(user) : undefined;
  }

  static async addNewUser(userData: UserInput): Promise<User> {
    return UserMapper.toDomain(
      await userDal.create(userData),
    );
  }

  static async deleteUser(id: string): Promise<boolean> {
    return userDal.deleteById(id);
  }

  static async updateUser(id: string, userData: UserInput): Promise<User> {
    return UserMapper.toDomain(
      await userDal.update(id, userData),
    );
  }
}
