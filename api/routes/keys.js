import express from "express";
const keys = express.Router();
//
import KeyController from "../src/controllers/keyController.js";

/**
 * @openapi
 * /keys/add/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Adicionar uma nova chave
 *     tags:
 *       - Chaves Secretas
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: key
 *                 description:
 *                   type: string
 *                   example: Google
 *                 password:
 *                   type: string
 *                   example: 123456
 *                 userId:
 *                   type: integer
 *                   example: 2
 *     responses:
 *       200:
 *         description: Sucesso
 */
keys.post("/add", KeyController.add);

/**
 * @openapi
 * /keys/get/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Chaves Secretas
 *     summary: Busca todas as chaves secretas pelo id do usuario
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
keys.get("/get/:id", KeyController.get);

/**
 * @openapi
 * /keys/get/id/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Chaves Secretas
 *     summary: Busca uma chave secreta pelo id
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
keys.get("/get/id/:id", KeyController.getById);

/**
 * @openapi
 * /keys/edit/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Chaves Secretas
 *     summary: Busca uma chave secreta pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *            example: 2
 * 
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: title
 *                 description:
 *                   type: string
 *                   example: description
 *                 password:
 *                   type: string
 *                   example: password
 *
 *     responses:
 *       200:
 *         description: Sucesso
 */
keys.put("/edit/:id", KeyController.edit);

/**
 * @openapi
 * /keys/remove/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Chaves Secretas
 *     summary: Deleta uma chave secreta pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *            example: 1
 * 
 *     responses:
 *       200:
 *         description: Sucesso
 */
keys.delete("/remove/:id", KeyController.destroy);

export default keys;
