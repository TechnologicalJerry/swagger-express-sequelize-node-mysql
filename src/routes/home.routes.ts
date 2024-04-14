import { Router } from "express";
import { healthcheck } from "../controllers/home.controller";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/check", healthcheck);
  }
}

export default new HomeRoutes().router;
