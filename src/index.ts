import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import Database from "./config/database";

export default class Server {
  constructor(server: Application) {
    this.config(server);
    this.syncDatabase();
    new Routes(server);
  }

  private config(server: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:5050"
    };

    server.use(cors(corsOptions));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
  }

  private syncDatabase(): void {
    const database = new Database();
    database.sequelize?.sync();
  }
}
