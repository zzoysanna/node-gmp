import GroupModel from '../models/group.model';
import { GroupInput, GroupOutput } from '../types';

const NO_GROUP_MSG = 'No such group';

export const create = async (payload: GroupInput): Promise<GroupOutput> => {
  const group = await GroupModel.create(payload);
  return group.toJSON();
};

export const getById = async (id: string): Promise<GroupOutput> => {
  const group = await GroupModel.findByPk(id);
  if (group == null) {
    throw new Error(NO_GROUP_MSG);
  }
  return group.toJSON();
};

export const update = async (id: string, payload: GroupInput): Promise<GroupOutput> => {
  const group = await GroupModel.findByPk(id);
  if (group == null) {
    throw new Error(NO_GROUP_MSG);
  }
  const updatedGroup = await (group).update(payload);
  return updatedGroup.toJSON();
};

export const deleteById = async (id: string): Promise<boolean> => {
  const group = await GroupModel.findByPk(id);
  if (group == null) {
    throw new Error(NO_GROUP_MSG);
  }
  const deletedGroupCount = await GroupModel.destroy({
    where: { id },
  });
  return deletedGroupCount > 0;
};

export const getAll = async (): Promise<GroupOutput[]> => GroupModel.findAll();
