import express, { Request, Response } from 'express'
import UserService from '../services/user.service'
import * as Validation from '../middleware/validation.middleware'
import Joi from 'joi'
import { User } from '../types'
import UserMapper from '../services/user.mapper'

export const router = express.Router()
const userService = new UserService(new UserMapper())

const NO_USER_MSG = 'No such user'
const EMPTY_STR_MSG = 'Empty string'
const DEFAILT_LIMIT = 5

const userSchema: Joi.ObjectSchema<User> = Joi.object().keys({
  login: Joi.string().alphanum().required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
  age: Joi.number().integer().min(4).max(130).required()
})

const getErrorMessage = (error: unknown): { message: string } => {
  const message = error instanceof Error ? error.message : String(error)
  return { message }
}

router.post('/createUser', Validation.validateSchema(userSchema), async (req: Request, res: Response) => {
  try {
    const newUser = await userService.addNewUser(req.body)
    res.status(200).json(newUser.id)
  } catch (e: unknown) {
    res.status(500).send(getErrorMessage(e))
  }
})

router.get('/user/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const currentUser = await userService.findUserById(id)
    if (currentUser != null) {
      res.status(200).json(currentUser.isDeleted ? NO_USER_MSG : currentUser)
    } else {
      res.status(404).send(NO_USER_MSG)
    }
  } catch (e: unknown) {
    res.status(500).send(getErrorMessage(e))
  }
})

router.put('/user/:id', Validation.validateSchema(userSchema), async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const currentUser = await userService.findUserById(id)
    if (currentUser != null) {
      const result = await userService.updateUser(id, req.body)
      res.status(200).json(result)
    } else {
      res.status(404).send(NO_USER_MSG)
    }
  } catch (e: unknown) {
    res.status(500).send(getErrorMessage(e))
  }
})

router.delete('/user/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const currentUser = await userService.findUserById(id)
    if (currentUser != null) {
      const result = await userService.deleteUser(id)
      !!result && res.sendStatus(200)
    } else {
      res.status(404).send(NO_USER_MSG)
    }
  } catch (e) {
    res.status(500).send(getErrorMessage(e))
  }
})

router.get('/searchUsers', async (req: Request, res: Response) => {
  const { loginSubstring, limit } = req.query
  try {
    if (loginSubstring !== undefined && typeof loginSubstring === 'string') {
      const users = await userService.getAutoSuggestUsers(
        loginSubstring,
        limit !== undefined ? Number(limit) : DEFAILT_LIMIT
      )
      res.status(200).json(users)
    } else {
      res.status(404).send(EMPTY_STR_MSG)
    }
  } catch (e) {
    res.status(500).send(getErrorMessage(e))
  }
})
