import { Sequelize } from 'sequelize';
import { Error } from '../types';

const dbString = process.env.DB ?? 'db';
const sequelizeConnection = new Sequelize(`postgres://${dbString}`);

sequelizeConnection.authenticate()
  .then(() => console.log('DB connection has been established successfully'))
  .catch((error: Error) => {
    console.error('Unable to connect to the database:');
    console.error(error);
  });

export default sequelizeConnection;
