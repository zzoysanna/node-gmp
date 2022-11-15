import { DataTypes, Model } from 'sequelize';
import { UserDbFields, UserInput } from '../types';
import sequelizeConnection from '../db/config';

class UserModel extends Model<UserDbFields, UserInput> implements UserDbFields {
  declare id: string;

  declare login: string;

  declare password: string;

  declare age: number;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      onDelete: 'cascade',
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'users',
    sequelize: sequelizeConnection,
  },
);

UserModel.sync().catch(
  (error) => console.error(error),
);

export default UserModel;
