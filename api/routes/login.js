import express from "express";
import loginController from "../src/controllers/loginController.js";

const login = express.Router();

/* GET users listing. */
login.post("/", loginController.login);
login.post("/verify", loginController.verify);

export default login;
