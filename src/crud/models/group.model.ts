import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../db/config';
import { GroupDbFields, GroupInput } from '../types';

class GroupModel extends Model<GroupDbFields, GroupInput> implements GroupDbFields {
  declare id: string;

  declare name: string;

  declare permissions: string[];
}

GroupModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
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

GroupModel.sync().catch(
  (error) => console.error(error),
);

export default GroupModel;
