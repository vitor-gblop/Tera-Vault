import express from "express";
const keys = express.Router();
//
import KeyController from "../src/controllers/keyController.js";

/* GET keys listing. */
keys.post("/add", KeyController.add);
keys.get("/get/:id", KeyController.get);
keys.get("/get/id/:id", KeyController.getById);
keys.delete("/remove/:id", KeyController.destroy);

export default keys;
