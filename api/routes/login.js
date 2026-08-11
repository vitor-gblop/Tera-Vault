import express from "express";
import loginController from "../src/controllers/loginController.js";

const login = express.Router();

/**
 * @openapi
 * /login/:
 *   post:
 *     summary: Email para o qual é enviado o codigo
 *     tags:
 *       - Login
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
 *     responses:
 *       200:
 *         description: Sucesso
 */
login.post("/", loginController.login);

/**
 * @openapi
 * /login/verify/:
 *   post:
 *     summary: Verifica o codigo de verificação de 6 digitos
 *     tags:
 *       - Login
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
 *                 code:
 *                   type: string
 *                   example: 000000
 *     responses:
 *       200:
 *         description: Sucesso
 */
login.post("/verify", loginController.verify);

export default login;
