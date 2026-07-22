import express from "express";
import historicController from "../src/controllers/historicController.js";
const history = express.Router();

/* Update history */
history.post("/add", historicController.add);
history.get("/get/:id", historicController.get);

export default history;
