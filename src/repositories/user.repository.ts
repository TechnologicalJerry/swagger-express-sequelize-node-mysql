import { Op } from "sequelize";
import User from "../models/user.model";

interface IUserRepository {
  save(user: User): Promise<User>;
  retrieveAll(searchParams: {
    username: string;
    permanent: boolean;
  }): Promise<User[]>;
  retrieveById(userId: number): Promise<User | null>;
  update(user: User): Promise<number>;
  delete(userId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

class UserRepository implements IUserRepository {
  async save(user: User): Promise<User> {
    try {
      return await User.create({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } catch (err) {
      throw new Error("Failed to create User!");
    }
  }

  async retrieveAll(searchParams: {
    username?: string;
    permanent?: boolean;
  }): Promise<User[]> {
    try {
      let condition: SearchCondition = {};
      if (searchParams?.permanent) condition.permanent = true;
      if (searchParams?.username)
        condition.username = { [Op.like]: `%${searchParams.username}%` };
      return await User.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve Users!");
    }
  }

  async retrieveById(userId: number): Promise<User | null> {
    try {
      return await User.findByPk(userId);
    } catch (error) {
      throw new Error("Failed to retrieve Users!");
    }
  }

  async update(user: User): Promise<number> {
    const { id, username, firstName, lastName, email, permanent } = user;
    try {
      const affectedRows = await User.update(
        { username, firstName, lastName, email, permanent },
        { where: { id: id } }
      );
      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update User!");
    }
  }

  async delete(userId: number): Promise<number> {
    try {
      const affectedRows = await User.destroy({ where: { id: userId } });
      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete User!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return User.destroy({
        where: {},
        truncate: false,
      });
    } catch (error) {
      throw new Error("Failed to delete Users!");
    }
  }
}

export default new UserRepository();
