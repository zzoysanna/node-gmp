import { Op } from 'sequelize';
import UserModel from '../models/user.model';
import { UserInput, UserOutput, UsersFilters } from '../types';
import { CustomException } from '../utils';

const NO_USER_MSG = 'No such user';
const EMPTY_STR_MSG = 'Empty string';

export const create = async (payload: UserInput): Promise<UserOutput> => {
  const user = await UserModel.create(payload);
  return user.toJSON();
};

export const getById = async (id: string): Promise<UserOutput> => {
  const user = await UserModel.findByPk(id);
  if (user == null) {
    throw new CustomException(NO_USER_MSG, 404);
  }
  return user.toJSON();
};

export const update = async (id: string, payload: UserInput): Promise<UserOutput> => {
  const user = await UserModel.findByPk(id);
  if (user == null) {
    throw new CustomException(NO_USER_MSG, 404);
  }
  const updatedUser = await (user).update(payload);
  return updatedUser.toJSON();
};

export const deleteById = async (id: string): Promise<boolean> => {
  const user = await UserModel.findByPk(id);
  if (user == null) {
    throw new CustomException(NO_USER_MSG, 404);
  }
  const deletedUserCount = await UserModel.destroy({
    where: { id },
  });
  return deletedUserCount > 0;
};

export const getAll = async (filters?: UsersFilters): Promise<UserOutput[]> => {
  const isLoginSubstring = filters?.loginSubstring !== '';
  const isLimit = filters?.limit !== undefined;
  if (!isLoginSubstring) {
    throw new CustomException(EMPTY_STR_MSG, 404);
  }
  const users = await UserModel.findAll({
    where: {
      ...(isLoginSubstring && { login: { [Op.substring]: filters?.loginSubstring } }),
    },
    ...(isLimit && { limit: filters.limit }),
    order: [['login', 'ASC']],
  });
  return users;
};

export const findByName = async (name: string): Promise<UserOutput> => {
  const user = await UserModel.findOne({ where: { login: name } });
  if (user == null) {
    throw new CustomException(NO_USER_MSG, 404);
  }
  return user.toJSON();
};
