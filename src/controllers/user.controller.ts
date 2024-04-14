import { Request, Response } from "express";
import User from "../models/user.model";
import usersRepository from "../repositories/user.repository";

export default class UserController {
  async create(req: Request, res: Response) {
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
    try {
      const user: User = req.body;
      if (!user.permanent) user.permanent = false;

      const savedUser = await usersRepository.save(user);

      res.status(201).send(savedUser);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving users.",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const username =
      typeof req.query.username === "string" ? req.query.username : "";
    try {
      const users = await usersRepository.retrieveAll({ username });
      res.status(200).send(users);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving users.",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    try {
      const user = await usersRepository.retrieveById(id);
      if (user) res.status(200).send(user);
      else
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving User with id=${id}.`,
      });
    }
  }

  async update(req: Request, res: Response) {
    let user: User = req.body;
    user.id = parseInt(req.params.id);
    try {
      const num = await usersRepository.update(user);

      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${user.id}. Maybe User was not found or req.body is empty!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating User with id=${user.id}.`,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    try {
      const num = await usersRepository.delete(id);
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete User with id==${id}.`,
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await usersRepository.deleteAll();
      res.send({ message: `${num} Users were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all users.",
      });
    }
  }

  async findAllPermanent(req: Request, res: Response) {
    try {
      const users = await usersRepository.retrieveAll({ permanent: true });
      res.status(200).send(users);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving users.",
      });
    }
  }
}
