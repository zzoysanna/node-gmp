import {
  jest, describe, expect, test, beforeEach,
} from '@jest/globals';
import {
  Request, Response, Send,
} from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import UserService from '../services/user.service';
import UserController from './user.controller';
import { User } from '../types';

jest.mock('../services/user.service', () => ({
  getAutoSuggestUsers: jest.fn(),
  addNewUser: jest.fn(),
  findUserById: jest.fn(),
  deleteUser: jest.fn(),
  updateUser: jest.fn(),
}));

const testUser1 = {
  id: '1',
  login: 'test',
  password: 'password',
  age: 25,
  isDeleted: false,
};

const testResponse: User[] = [testUser1];

const mockedService = jest.mocked(UserService);

describe('UserController', () => {
  let clearFunc: () => void;

  beforeEach(() => {
    if (typeof clearFunc === 'function') {
      clearFunc();
    }
  });

  test('should search users', async () => {
    let responseObject: unknown = {};
    mockedService.getAutoSuggestUsers.mockResolvedValue(testResponse);

    const req = getMockReq({
      query: {
        loginSubstring: 'test',
        limit: '2',
      },
    });
    const { res, next, mockClear } = getMockRes();
    res.json = jest.fn().mockImplementation((result: unknown) => {
      responseObject = result;
    }) as Send;
    clearFunc = mockClear;

    await UserController.searchUsers(req as Request, res as Response, next);

    expect(UserService.getAutoSuggestUsers).toHaveBeenCalledWith('test', '2');
    expect(UserService.getAutoSuggestUsers).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(responseObject).toEqual(testResponse);
  });

  test('should return error', async () => {
    mockedService.getAutoSuggestUsers.mockImplementation(() => {
      throw new Error('user service error');
    });
    const req = getMockReq();
    const { res, next } = getMockRes();

    expect.assertions(1);
    UserController.searchUsers(req as Request, res, next).catch((e) => {
      expect(e.message).toMatch('user service error');
    });
  });

  test('should create new user', async () => {
    const newUserData = {
      login: 'test2',
      password: 'password2',
      age: 35,
      isDeleted: false,
    };
    const newUserId = '2';
    let responseObject: unknown;

    mockedService.addNewUser.mockResolvedValue({
      ...newUserData,
      id: newUserId,
    });
    const req = getMockReq({
      body: newUserData,
    });
    const { res, next, mockClear } = getMockRes();
    res.json = jest.fn().mockImplementation((result: unknown) => {
      responseObject = result;
    }) as Send;
    clearFunc = mockClear;

    await UserController.createNewUser(req as Request, res as Response, next);

    expect(UserService.addNewUser).toHaveBeenCalledTimes(1);
    expect(UserService.addNewUser).toHaveBeenCalledWith(newUserData);
    expect(responseObject).toEqual(newUserId);
    expect(res.json).toHaveBeenCalled();
  });

  test('should find user', async () => {
    let responseObject: unknown;
    const testId = '1';
    mockedService.findUserById.mockResolvedValue(testUser1);

    const req = getMockReq({
      params: { id: testId },
    });
    const { res, next, mockClear } = getMockRes();
    res.json = jest.fn().mockImplementation((result: unknown) => {
      responseObject = result;
    }) as Send;
    clearFunc = mockClear;

    await UserController.findUser(req as Request, res as Response, next);

    expect(UserService.findUserById).toHaveBeenCalledTimes(1);
    expect(UserService.findUserById).toHaveBeenCalledWith(testId);
    expect(responseObject).toEqual(testUser1);
    expect(res.json).toHaveBeenCalled();
  });

  test('should delete user', async () => {
    const testId = '2';
    mockedService.deleteUser.mockResolvedValue(true);
    let responseStatus: unknown;

    const req = getMockReq({
      params: { id: testId },
    });
    const { res, next, mockClear } = getMockRes();
    res.sendStatus = jest.fn().mockImplementation((result: unknown) => {
      responseStatus = result;
    }) as Send;
    clearFunc = mockClear;

    await UserController.deleteUser(req as Request, res as Response, next);

    expect(UserService.deleteUser).toHaveBeenCalledTimes(1);
    expect(UserService.deleteUser).toHaveBeenCalledWith(testId);
    expect(responseStatus).toEqual(200);
    expect(res.json).not.toHaveBeenCalled();
  });

  test('should update user', async () => {
    const newUserData = {
      ...testUser1,
      login: 'new login',
    };
    mockedService.updateUser.mockResolvedValue(newUserData);

    const req = getMockReq({
      params: { id: testUser1.id },
      body: newUserData,
    });
    const { res, next, mockClear } = getMockRes();
    res.json = jest.fn().mockImplementation((result: unknown) => {
      expect((result as User).login).toEqual('new login');
    }) as Send;
    clearFunc = mockClear;

    await UserController.updateUser(req as Request, res as Response, next);

    expect(UserService.updateUser).toHaveBeenCalledTimes(1);
    expect(UserService.updateUser).toHaveBeenCalledWith(testUser1.id, newUserData);
    expect(res.json).toHaveBeenCalled();
  });
});
