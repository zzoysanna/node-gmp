import { v4 as uuidv4 } from 'uuid';
import { GroupInput, GroupDbFields, Group } from '../types';
import GroupMapper from '../mappers/group.mapper';
import * as groupDal from '../db/group.dal';
import { Loggable } from '../utils';

@Loggable()
export default class GroupService {
  static async getAllGroups(): Promise<Group[]> {
    const groups = await groupDal.getAll();
    return groups.map((item) => GroupMapper.toDomain(item));
  }

  static async findGroupById(id: string): Promise<Group | undefined> {
    const group = await groupDal.getById(id);
    return group ? GroupMapper.toDomain(group) : undefined;
  }

  static async addNewGroup(data: Omit<GroupInput, 'id'>): Promise<Group> {
    const id = uuidv4();
    return GroupMapper.toDomain(
      await groupDal.create({ id, ...data }),
    );
  }

  static async deleteGroup(id: string): Promise<boolean> {
    return groupDal.deleteById(id);
  }

  static async updateGroup(id: string, data: GroupInput): Promise<GroupDbFields> {
    return GroupMapper.toDomain(
      await groupDal.update(id, data),
    );
  }

  static async addUsersToGroup(groupId: string, userIds: string[]): Promise<void> {
    return groupDal.addUsersToGroup(groupId, userIds);
  }
}
