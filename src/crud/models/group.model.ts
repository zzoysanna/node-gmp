import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../db/config';
import { GroupDbFields, GroupInput } from '../types';
import UserModel from './user.model';

class GroupModel extends Model<GroupDbFields, GroupInput> implements GroupDbFields {
  declare id: string;

  declare name: string;

  declare permissions: string[];

  declare addUserModels: Function;
}

GroupModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      onDelete: 'cascade',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'groups',
    sequelize: sequelizeConnection,
  },
);

const UserGroup = sequelizeConnection.define('user_groups', {}, {
  timestamps: false,
});
UserModel.belongsToMany(GroupModel, {
  through: UserGroup,
  onDelete: 'cascade',
  hooks: true,
});
GroupModel.belongsToMany(UserModel, {
  through: UserGroup,
  onDelete: 'cascade',
  hooks: true,
});

UserGroup.sync().catch(
  (error) => console.error(error),
);

GroupModel.sync().catch(
  (error) => console.error(error),
);

export default GroupModel;
