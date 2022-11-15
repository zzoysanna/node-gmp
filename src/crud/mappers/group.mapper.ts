import {
  Permission, Group, GroupInput, GroupDbFields,
} from '../types';

export default class GroupMapper {
  static toDomain(entity: GroupDbFields): Group {
    const {
      id, name, permissions,
    } = entity;
    return {
      id, name, permissions: permissions as Permission[],
    };
  }

  static toDalEntity(entity: Group): GroupInput {
    const {
      id, name, permissions,
    } = entity;
    return {
      id, name, permissions: permissions as string[],
    };
  }
}
