import {HttpStatusCode} from "axios";
import {request, response} from "express";
import Historic from "../models/historic.js";
import Keys from "../models/keys.js";
import {decrypt, encrypt} from "../services/encryptKey.js";
import verifySecurityLevel from "../services/verifySecurityLevel.js";

class KeyController {
  /**
   * Add new secret key
   * @param {*} req
   * @param {*} res
   * @returns the new key added
   */
  static async add(req = request, res = response) {
    try {
      const {title, password, description, userId} = req.body;

      const secure = verifySecurityLevel(password);

      // Criptografar senha - encrypt key
      const secureKey = encrypt(password);

      const key = await Keys.create({
        title: title,
        password: secureKey, // chave secreta - secret key
        description: description,
        secure: secure, // nivel de segurança - security level
        userId: userId,
      });

      res.json({message: "Key added successfully!", key});
      //
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.InternalServerError)
        .json({error: "Error creating key"});
    }
  }

  /**
   * Find all secret keys
   * @param {*} req
   * @param {*} res
   * @returns All secret keys
   */
  // @ts-ignore
  static async get(req = request, res = response) {
    const {id} = req.params;

    // prettier-ignore
    try {
      const keys = await Keys.findAll({where: {
        userId: id
      }});

      res.json(keys);
      //
    } 
    catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.InternalServerError)
        .json({ error: "Error fetching keys" });
    }
  }

  /**
   * Find secret key by id
   * @param {*} req
   * @param {*} res
   * @returns the secret key
   */
  static async getById(req = request, res = response) {
    try {
      const key = await Keys.findByPk(req.params.id, {
        include: [Historic], // modelo associado - Associated Model
      });

      if (!key) {
        return res
          .status(HttpStatusCode.NotFound)
          .json({message: "Key not found"});
      }

      const keyPayload = {
        // @ts-ignore - erro de propriedade id
        id: key.id,
        // @ts-ignore - erro de propriedade title
        title: key.title,
        // @ts-ignore - erro de propriedade description
        description: key.description,
        // @ts-ignore - erro de propriedade password
        password: decrypt(key.password),
        // @ts-ignore - erro de propriedade secure
        secure: key.secure,
        // @ts-ignore - erro de propriedade historics
        historic: key.historics,
      };

      res.json(keyPayload);
      //
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.InternalServerError)
        .json({error: "Error fetching key"});
    }
  }

  static async edit(req = request, res = response) {
    try {
      const title = req.body.title;
      const description = req.body.description;
      const password = req.body.password;

      const secure = verifySecurityLevel(password);

      // @ts-ignore
      const key = await Keys.findByPk(req.params.id);

      if (!key) {
        return res
          .status(HttpStatusCode.NotFound)
          .json({message: "Key not found"});
      }

      const keyPayload = {
        // @ts-ignore - erro de propriedade id
        id: key.id,
        // @ts-ignore - erro de propriedade title
        title: title,
        // @ts-ignore - erro de propriedade description
        description: description,
        // @ts-ignore - erro de propriedade password
        password: password,
        // @ts-ignore - erro de propriedade secure
        secure: secure, // nova segurança
        // @ts-ignore - erro de propriedade historics
        historic: key.historics,
      };

      res.json(keyPayload);
      //
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.InternalServerError)
        .json({error: "Error fetching key"});
    }
  }

  /**
   * Remove a register of secret key
   * @param {*} req
   * @param {*} res
   * @returns empty
   */
  static async destroy(req = request, res = response) {
    // prettier-ignore
    try {
      const key = await Keys.findByPk(req.params.id);

      if (!key) {
        return res
          .status(HttpStatusCode.NotFound)
          .json({ message: "Key not found" });
      }

      await key.destroy();
      res.json({ message: "Key deleted successfully" });
    } 
    catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.InternalServerError)
        .json({ error: "Error deleting key" });
    }
  }
}

export default KeyController;
