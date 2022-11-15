import GroupModel from '../models/group.model';
import UserModel from '../models/user.model';
import { GroupInput, GroupOutput } from '../types';
import sequelizeConnection from './config';
import { CustomException } from '../utils';

const NO_GROUP_MSG = 'No such group';
const TRANSACTION_ERR_MSG = 'Transaction failed';

export const create = async (payload: GroupInput): Promise<GroupOutput> => {
  const group = await GroupModel.create(payload);
  return group.toJSON();
};

export const getById = async (id: string): Promise<GroupOutput> => {
  const group = await GroupModel.findByPk(id);
  if (group == null) {
    throw new CustomException(NO_GROUP_MSG, 404);
  }
  return group.toJSON();
};

export const update = async (id: string, payload: GroupInput): Promise<GroupOutput> => {
  const group = await GroupModel.findByPk(id);
  if (group == null) {
    throw new CustomException(NO_GROUP_MSG, 404);
  }
  const updatedGroup = await (group).update(payload);
  return updatedGroup.toJSON();
};

export const deleteById = async (id: string): Promise<boolean> => {
  const group = await GroupModel.findByPk(id);
  if (group == null) {
    throw new CustomException(NO_GROUP_MSG, 404);
  }
  const deletedGroupCount = await GroupModel.destroy({
    where: { id },
  });
  return deletedGroupCount > 0;
};

export const getAll = async (): Promise<GroupOutput[]> => GroupModel.findAll();

export const addUsersToGroup = async (groupId: string, userIds: string[]): Promise<void> => {
  try {
    await sequelizeConnection.transaction(async () => {
      const group = await GroupModel.findByPk(groupId);
      const promises = userIds.map(async (id) => UserModel.findByPk(id));
      const users = await Promise.all(promises);
      if (group == null) {
        throw new CustomException(NO_GROUP_MSG, 404);
      }
      return group.addUserModels(users);
    });
  } catch (error: unknown) {
    throw new CustomException(TRANSACTION_ERR_MSG, 500);
  }
};
