import {HttpStatusCode} from "axios";
import Historic from "../models/historic.js";

const codebox = new Map();

class HistoricController {
  /**
   * Atualiza o registro de copia da chave
   * Update the key copy register
   * @param {*} req
   * @param {*} res
   * @returns novo registro ao historico de uma chave - add new register to the historic of a key
   */
  async add(req, res) {
    const {keyId} = req.body;

    // prettier-ignore
    try {
      const now = new Date();
      const history = await Historic.create({
        date: now.toISOString().slice(0, 10),
        time: now.toTimeString().split(" ")[0],
        keyId: keyId
      });
      
      res.json(history);
    } 
    catch (error) {
      console.log(error);
      return res
        .status(HttpStatusCode.InternalServerError)
        .json({ error: "Error finding user" });
    }
  }

  /**
   * Busca todos os historicos
   * Find all historics
   * @param {*} req
   * @param {*} res
   * @returns informação do usuario criptografada em base 64 - encrypted user data in base 64 -
   */
  async get(req, res) {
    const {id} = req.params;

    // prettier-ignore
    try {
      const history = await Historic.findAll({ where: { keyId: id } });
      return res.json(history);
    } 
    catch (error) {
      console.log(error);
      return res
        .status(HttpStatusCode.InternalServerError)
        .json({ error: "Error finding user" });
    }
  }
}

export default new HistoricController();
