import express, { Request, Response } from 'express'
import * as UserService from '../services/user.service'
import * as Validation from '../middleware/validation.middleware'
import Joi from 'joi'
import { User } from '../models'

export const router = express.Router()

const NO_USER_MSG = 'No such user'
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

router.post('/createUser', Validation.validateSchema(userSchema), (req: Request, res: Response) => {
  try {
    const newUser = UserService.addNewUser(req.body)
    res.status(200).json(newUser.id)
  } catch (e: unknown) {
    res.status(500).send(getErrorMessage(e))
  }
})

router.get('/user/:id', (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const currentUser = UserService.findUserById(id)
    if (currentUser != null) {
      res.status(200).json(currentUser.isDeleted ? NO_USER_MSG : currentUser)
    } else {
      res.status(404).send(NO_USER_MSG)
    }
  } catch (e: unknown) {
    res.status(500).send(getErrorMessage(e))
  }
})

router.put('/user/:id', Validation.validateSchema(userSchema), (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const currentUser = UserService.findUserById(id)
    if (currentUser != null) {
      UserService.updateUser(id, req.body)
      res.sendStatus(200)
    } else {
      res.status(404).send(NO_USER_MSG)
    }
  } catch (e: unknown) {
    res.status(500).send(getErrorMessage(e))
  }
})

router.delete('/user/:id', (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const currentUser = UserService.findUserById(id)
    if (currentUser != null) {
      UserService.deleteUser(id)
      res.sendStatus(200)
    } else {
      res.status(404).send(NO_USER_MSG)
    }
  } catch (e) {
    res.status(500).send(getErrorMessage(e))
  }
})

router.get('/searchUsers', (req: Request, res: Response) => {
  const { loginSubstring, limit } = req.query
  try {
    if (loginSubstring !== undefined && typeof loginSubstring === 'string') {
      const users = UserService.getAutoSuggestUsers(
        loginSubstring,
        limit !== undefined ? Number(limit) : DEFAILT_LIMIT
      )
      res.status(200).json(users)
    }
  } catch (e) {
    res.status(500).send(getErrorMessage(e))
  }
})
