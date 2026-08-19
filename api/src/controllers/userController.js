// @ts-ignore
import {HttpStatusCode} from "axios";
import Users from "../models/users.js";
import {where} from "sequelize";

class UserController {
  /**
   * Add new user
   * @param {*} req
   * @param {*} res
   * @returns  new user
   */
  async add(req, res) {
    try {
      const {name, email} = req.body;

      const existentUser = await Users.findOne({where: {email}});
      if (existentUser) {
        return res
          .status(HttpStatusCode.Conflict)
          .json({message: "User already exists"});
      }

      // @ts-ignore
      const user = await Users.create({name, email});
      return res.json({message: "User added successfully!", user});
      //
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatusCode.InternalServerError)
        .json({error: "Error creating user"});
    }
  }

  /**
   * Find all users
   * @param {*} req
   * @param {*} res
   * @returns all users
   */
  async get(req, res) {
    try {
      // @ts-ignore
      const users = await Users.findAll({raw: true});
      return res.json(users);
      //
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatusCode.InternalServerError)
        .json({error: "Error fetching users"});
    }
  }

  /**
   * Find users by id
   * @param {*} req
   * @param {*} res
   * @returns  user
   */
  async getById(req, res) {
    try {
      // @ts-ignore
      const user = await Users.findByPk(req.params.id);
      if (!user) {
        return res
          .status(HttpStatusCode.NotFound)
          .json({message: "User not found"});
      }
      return res.json(user);
      //
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatusCode.InternalServerError)
        .json({error: "Error fetching user"});
    }
  }

  /**
   * Edit user info
   * @param {*} req
   * @param {*} res
   * @returns updated user
   */
  async edit(req, res) {
    try {
      const {name, email} = req.body;
      // @ts-ignore
      const user = await Users.findByPk(req.params.id);
      if (!user) {
        return res
          .status(HttpStatusCode.NotFound)
          .json({message: "User not found"});
      }
      await user.update({name, email});
      return res.json({message: "User updated successfully", user});
      //
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatusCode.InternalServerError)
        .json({error: "Error updating user"});
    }
  }

  /**
   * Remove a user register
   * @param {*} req
   * @param {*} res
   * @returns empty
   */
  async destroy(req, res) {
    try {
      // @ts-ignore
      const user = await Users.findByPk(req.params.id);
      if (!user) {
        return res
          .status(HttpStatusCode.NotFound)
          .json({message: "User not found"});
      }
      await user.destroy();
      return res.json({message: "User deleted successfully"});
      //
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatusCode.InternalServerError)
        .json({error: "Error deleting user"});
    }
  }
}

export default new UserController();
