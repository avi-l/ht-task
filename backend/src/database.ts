import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env || {};

const sequelize = new Sequelize({
    database: DB_DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT ? parseInt(DB_PORT, 10) : 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false
      },
    },
  });
export default sequelize;
