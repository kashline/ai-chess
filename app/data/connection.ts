import pg from 'pg';
import { Sequelize } from 'sequelize';

const useSSL = process.env.NODE_ENV === "production";

const dialectOptions = useSSL
  ? { ssl: { require: true, rejectUnauthorized: false } }
  : {};

const sequelize = new Sequelize({
  username: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  port: 5432,
  password: process.env.POSTGRES_PASSWORD,
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
  dialectOptions,
});

export default sequelize;
