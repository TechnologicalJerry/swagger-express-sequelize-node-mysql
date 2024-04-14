import { Application } from "express";
import userRoutes from "./user.routes";
import homeRoutes from "./home.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/healthcheck", homeRoutes);
    app.use("/user", userRoutes);
  }
}
