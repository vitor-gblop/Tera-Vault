import express from "express";
import userController from "../src/controllers/userController.js";
const users = express.Router();

/* GET users listing. */
users.post("/add", userController.add);
users.get("/get", userController.get);
users.get("/get/id/:id", userController.getById);
users.delete("/remove/:id", userController.destroy);

export default users;
