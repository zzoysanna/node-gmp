export interface UserDbFields {
  id: string
  login: string
  password: string
  age: number
  createdAt?: Date | undefined
  updatedAt?: Date | undefined
  deletedAt?: Date | undefined
}
export interface UserInput extends Optional<UserDbFields, 'id'> {}
export interface UserOutput extends Pick<UserDbFields, 'id' | 'login' | 'password' | 'age'> {}
