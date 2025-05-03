module.exports = {
    development: {
      username: "postgres",
      password: "uYOP9g2XtF",
      database: "aichess",
      host: "localhost",
      dialect: "postgres",
    },
    production: {
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      host: process.env.POSTGRES_HOST,
      port: 5432,
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
        },
      },
    },
  };
  