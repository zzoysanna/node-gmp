import { v4 as uuidv4 } from 'uuid'
import { User } from '../models'

export const users: User[] = [
  {
    login: 'test',
    age: 35,
    password: 'pass1',
    id: '5',
    isDeleted: false
  },
  {
    login: 'anytest',
    age: 35,
    password: 'pass1',
    id: '4',
    isDeleted: false
  },
  {
    login: 'my Test',
    age: 35,
    password: 'pass1',
    id: '3',
    isDeleted: false
  },
  {
    login: 'my Test 1',
    age: 35,
    password: 'pass1',
    id: '6',
    isDeleted: false
  },
  {
    login: 'b Test 2',
    age: 35,
    password: 'pass1',
    id: '7',
    isDeleted: false
  },
  {
    login: 'zzz Test 3',
    age: 35,
    password: 'pass1',
    id: '8',
    isDeleted: false
  },
  {
    login: 'my Test 44',
    age: 35,
    password: 'pass1',
    id: '9',
    isDeleted: false
  },
  {
    login: 'anna',
    age: 35,
    password: 'pass1',
    id: '2',
    isDeleted: false
  }
]

export const addNewUser = (userData: Pick<User, 'login' | 'password' | 'age'>): User => {
  const newUser: User = {
    ...userData,
    id: uuidv4(),
    isDeleted: false
  }
  users.push(newUser)
  return newUser
}

export const updateUser = (id: string, userData: Partial<User>): void => {
  const currentUser = findUserById(id)
  if (currentUser != null) {
    const { login, password, age, isDeleted } = currentUser
    users[users.indexOf(currentUser)] = {
      id,
      isDeleted,
      login: userData.login ?? login,
      password: userData.password ?? password,
      age: userData.age ?? age
    }
  }
}

export const deleteUser = (id: string): void => {
  const currentUser = findUserById(id)
  if (currentUser != null) {
    currentUser.isDeleted = true
  }
}

export const findUserById = (id: string): User | undefined => users.find(user => user.id === id)

export const getAutoSuggestUsers = (loginSubstring: string, limit: number): User[] => {
  const filteredUsers = [...users]
    .filter(user => user.login.toLowerCase().includes(loginSubstring.toLowerCase()))
    .sort((a, b) => a.login.localeCompare(b.login))
  return filteredUsers.slice(0, limit)
}
