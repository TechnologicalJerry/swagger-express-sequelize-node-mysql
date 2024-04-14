import { Sequelize } from "sequelize-typescript";
import { config, dialect } from "./db.config";
import User from "../models/user.model";

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    this.sequelize = new Sequelize({
      host: config.DB_SERVER_HOST,
      database: config.DB_SERVER,
      username: config.DB_USER,
      password: config.DB_PASSWORD,
      dialect: dialect,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
      },
      models: [User],
    });
    await this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((error) => {
        console.error("Unable to connect to the Database:", error);
      });
  }
}

export default Database;
