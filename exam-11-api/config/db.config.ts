import { Sequelize } from 'sequelize';

const hostName = process.env.HOST || 'localhost';
const userName = process.env.DB_USER || 'postgres' ;
const database = process.env.DB_NAME || 'test_blob';
const password = process.env.DB_PASSWORD || 'root';

const sequelize = new Sequelize(
  database,
  userName,
  password, {
    dialect : 'postgres',
    host : hostName,
    port : 5432,
  });

export default sequelize;