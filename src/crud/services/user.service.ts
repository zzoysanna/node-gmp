import { User, UserInput } from '../types'
import * as userDal from '../db/user.dal'
import UserMapper from './user.mapper'

export default class UserService {
  mapper: UserMapper
  constructor (mapper: UserMapper) {
    this.mapper = mapper
  }

  async getAutoSuggestUsers (loginSubstring: string, limit: number): Promise<User[]> {
    const filteredUsers = await userDal.getAll({ loginSubstring, limit })
    return filteredUsers.map(item => this.mapper.toDomain(item))
  }

  async findUserById (id: string): Promise<User | undefined> {
    return this.mapper.toDomain(await userDal.getById(id))
  }

  async addNewUser (userData: UserInput): Promise<User> {
    return this.mapper.toDomain(
      await userDal.create(userData)
    )
  }

  async deleteUser (id: string): Promise<boolean> {
    return await userDal.deleteById(id)
  }

  async updateUser (id: string, userData: UserInput): Promise<User> {
    return this.mapper.toDomain(
      await userDal.update(id, userData)
    )
  }
}
