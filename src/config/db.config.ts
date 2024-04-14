export const config = {
  DB_SERVER_HOST: "localhost",
  DB_SERVER: "swagger-express-sequelize-node-mysql",
  DB_USER: "publicrepodbs",
  DB_PASSWORD: "publicrepodb",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export const dialect = "mysql";
