import {
  jest, describe, expect, test, beforeEach,
} from '@jest/globals';
import {
  Request, Response, Send,
} from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import GroupService from '../services/group.service';
import GroupController from './group.controller';
import { Group, Permission } from '../types';

jest.mock('../services/group.service', () => ({
  getAllGroups: jest.fn(),
  addNewGroup: jest.fn(),
  findGroupById: jest.fn(),
  deleteGroup: jest.fn(),
  updateGroup: jest.fn(),
  addUsersToGroup: jest.fn(),
}));

const group1 = {
  id: '1111-1111-1111',
  name: 'test group 1',
  permissions: ['READ', 'WRITE'],
} as Group;

const group2 = {
  id: '2222-2222-2222',
  name: 'test group 2',
  permissions: ['READ', 'WRITE', 'DELETE'],
} as Group;

const testResponse = [group1, group2];

const mockedService = jest.mocked(GroupService);

describe('GroupController', () => {
  let clearFunc: () => void;

  beforeEach(() => {
    if (typeof clearFunc === 'function') {
      clearFunc();
    }
  });

  test('should get groups', async () => {
    let responseObject: unknown = {};
    mockedService.getAllGroups.mockResolvedValue(testResponse);

    const req = getMockReq();
    const { res, next, mockClear } = getMockRes();
    res.json = jest.fn().mockImplementation((result: unknown) => {
      responseObject = result;
    }) as Send;
    clearFunc = mockClear;

    await GroupController.getAllGroups(req as Request, res as Response, next);

    expect(GroupService.getAllGroups).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(responseObject).toEqual(testResponse);
  });

  test('should find group by id', async () => {
    let responseObject: unknown = {};
    const testId = '1111-1111-1111';
    mockedService.findGroupById.mockResolvedValue(group1);

    const req = getMockReq(
      { params: { id: testId } },
    );
    const { res, next, mockClear } = getMockRes();
    res.json = jest.fn().mockImplementation((result: unknown) => {
      responseObject = result;
    }) as Send;
    clearFunc = mockClear;

    await GroupController.findGroup(req as Request, res as Response, next);

    expect(GroupService.findGroupById).toHaveBeenCalledWith(testId);
    expect(GroupService.findGroupById).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(responseObject).toEqual(group1);
  });

  test('should create group', async () => {
    const newGroupData = {
      name: 'test group 3',
      permissions: ['READ', 'WRITE', 'DELETE', 'SHARE'] as Permission[],
    } as Partial<Group>;
    const newGroupId = '3333-3333-3333';
    mockedService.addNewGroup.mockResolvedValue({
      id: newGroupId,
      name: 'test group 3',
      permissions: ['READ', 'WRITE', 'DELETE', 'SHARE'],
    });

    const req = getMockReq({ body: newGroupData });
    const { res, next, mockClear } = getMockRes();
    res.json = jest.fn().mockImplementation((result: unknown) => {
      expect(result).toMatch(newGroupId);
    }) as Send;
    clearFunc = mockClear;

    await GroupController.createGroup(req as Request, res as Response, next);

    expect(GroupService.addNewGroup).toHaveBeenCalledWith(newGroupData);
    expect(GroupService.addNewGroup).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(newGroupId);
  });

  test('should delete group', async () => {
    const testId = '1111-1111-1111';
    let responseStatus: unknown;
    mockedService.deleteGroup.mockResolvedValue(true);

    const req = getMockReq({
      params: { id: testId },
    });
    const { res, next, mockClear } = getMockRes();
    res.sendStatus = jest.fn().mockImplementation((result: unknown) => {
      responseStatus = result;
    }) as Send;
    clearFunc = mockClear;

    await GroupController.deleteGroup(req as Request, res as Response, next);

    expect(GroupService.deleteGroup).toHaveBeenCalledWith(testId);
    expect(GroupService.deleteGroup).toHaveBeenCalledTimes(1);
    expect(responseStatus).toEqual(200);
    expect(res.json).not.toHaveBeenCalled();
  });

  test('should update group', async () => {
    const newGroupData = {
      ...group1,
      name: 'new test group',
    };
    mockedService.updateGroup.mockResolvedValue(newGroupData);

    const req = getMockReq({
      params: { id: group1.id },
      body: newGroupData,
    });
    const { res, next, mockClear } = getMockRes();
    res.json = jest.fn().mockImplementation((result: unknown) => {
      expect((result as Group).name).toEqual('new test group');
    }) as Send;
    clearFunc = mockClear;

    await GroupController.updateGroup(req as Request, res as Response, next);

    expect(GroupService.updateGroup).toHaveBeenCalledWith(group1.id, newGroupData);
    expect(GroupService.updateGroup).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalled();
  });

  test('should add users to group', async () => {
    let responseStatus: unknown = {};
    mockedService.addUsersToGroup.mockResolvedValue();

    const req = getMockReq({
      body: {
        groupId: '3333-3333-3333',
        userIds: ['1', '2', '3'],
      },
    });
    const { res, next, mockClear } = getMockRes();
    res.sendStatus = jest.fn().mockImplementation((result: unknown) => {
      responseStatus = result;
    }) as Send;
    clearFunc = mockClear;

    await GroupController.addToGroup(req as Request, res as Response, next);

    expect(GroupService.addUsersToGroup).toHaveBeenCalledWith('3333-3333-3333', ['1', '2', '3']);
    expect(GroupService.addUsersToGroup).toHaveBeenCalledTimes(1);
    expect(responseStatus).toEqual(200);
    expect(res.json).not.toHaveBeenCalled();
  });

  test('should return error', async () => {
    mockedService.addUsersToGroup.mockImplementation(() => {
      throw new Error('groups service error');
    });
    const req = getMockReq();
    const { res, next } = getMockRes();

    expect.assertions(1);
    GroupController.addToGroup(req as Request, res, next).catch((e) => {
      expect(e.message).toMatch('groups service error');
    });
  });
});
