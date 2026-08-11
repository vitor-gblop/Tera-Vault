import express from "express";
import userController from "../src/controllers/userController.js";
import secureRoute from "../src/services/secureRoute.js";
const users = express.Router();

/**
 * @openapi
 * /users/add/:
 *   post:
 *     summary: Adicionar um novo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: example@gmail.com
 *                 name:
 *                   type: string
 *                   example: jonh doe
 *
 *     responses:
 *       200:
 *         description: Sucesso
 */
users.post("/add", userController.add);

/**
 * @openapi
 * /users/get/:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Usuarios
 *     summary: Busca todos os usuarios
 *     responses:
 *       200:
 *         description: Sucesso
 */
users.get("/get", secureRoute, userController.get);

/**
 * @openapi
 * /users/get/id/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Usuarios
 *     summary: Busca os usuarios pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       200:
 *         description: Sucesso
 */
users.get("/get/id/:id", secureRoute, userController.getById);

users.delete("/remove/:id", secureRoute, userController.destroy);

export default users;
