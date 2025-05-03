// eslint-disable-next-line @typescript-eslint/no-require-imports
const pg = require("pg");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Sequelize } = require("sequelize");

const dialectOptions =
  process.env.ENV !== "DEV" ? { ssl: { require: true } } : undefined;

const sequelize = new Sequelize({
  username: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  port: 5432,
  password: process.env.POSTGRES_PASSWORD,
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
  dialectOptions: dialectOptions,
});

export default sequelize;
