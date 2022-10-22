import { User, UserDbFields, UserInput } from '../types'

export default class UserMapper {
  toDomain (entity: UserDbFields): User {
    const { id, login, password, age, deletedAt } = entity
    return {
      id, login, password, age, isDeleted: !(deletedAt == null)
    }
  }

  toDalEntity (entity: User): UserInput {
    const { id, login, password, age } = entity
    return {
      id, login, password, age
    }
  }
}
