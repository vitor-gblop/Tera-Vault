import express from "express";
const router = express.Router();
//
import historic from "./historic.js";
import keys from "./keys.js";
import login from "./login.js";
import users from "./users.js";
import secureRoute from "../src/services/secureRoute.js";

// Rotas
router.use("/users", users);
router.use("/keys", secureRoute, keys);
router.use("/login", login);
router.use("/history", secureRoute, historic);

// Página inicial
router.get("/", function (req, res, next) {
  res.json({message: "Welcome to the API"});
});

export default router;
