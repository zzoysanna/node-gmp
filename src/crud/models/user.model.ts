import { DataTypes, Model } from 'sequelize'
import { UserDbFields, UserInput } from '../types'
import sequelizeConnection from '../db/config'

class UserModel extends Model<UserDbFields, UserInput> implements UserDbFields {
  declare id: string
  declare login: string
  declare password: string
  declare age: number

  readonly createdAt: Date | undefined
  readonly updatedAt: Date | undefined
  readonly deletedAt: Date | undefined
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  },
  {
    timestamps: true,
    tableName: 'users',
    paranoid: true,
    sequelize: sequelizeConnection
  }
)

UserModel.sync().catch(
  error => console.error(error)
)

export default UserModel
