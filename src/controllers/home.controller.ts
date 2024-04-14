import { Request, Response } from "express";

export function healthcheck(req: Request, res: Response): Response {
  return res.json({
    message:
      "Welcome to Swagger Express Sequelize Node Mysql server application.",
  });
}
