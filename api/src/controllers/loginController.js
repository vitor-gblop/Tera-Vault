import {HttpStatusCode} from "axios";
import {request, response} from "express";
import jwt from "jsonwebtoken";
import NodeCache from "node-cache";
import Users from "../models/users.js";
import send from "../services/nodemailer.js";

const codebox = new Map();
// Define o cache com expiração de 300 segundos (5 min) e checagem de deleção a cada 60s
const codeCache = new NodeCache({stdTTL: 300, checkperiod: 60});

class LoginController {
  /**
   * Verifica o registro do usuario
   * @param {*} req
   * @param {*} res
   * @returns dados do usuario criptografados em base 64
   */
  async login(req = request, res = response) {
    try {
      // @ts-ignore
      const user = await Users.findOne({where: {email: req.body.email}});
      console.log(user);
      if (!user) {
        return res
          .status(HttpStatusCode.NotFound)
          .json({message: "User not found"});
      }

      // Gera o codigo de 6 digitos
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      // Armazena no cache: key = email, value = code
      // @ts-ignore - erro de propriedade email
      codeCache.set(user.email, code);
      console.log("- ", code);

      /* Envia o email com codigo */
      // @ts-ignore - erro de propriedade email
      // send(user.email, "Login em terra vault", `codigo de acesso ${code}`);

      return res.status(HttpStatusCode.Ok).json({message: "User found", code});
      //
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatusCode.InternalServerError)
        .json({error: "Error finding user"});
    }
  }

  /**
   * Verifica o codigo enviado ao usuario
   * @param {*} req
   * @param {*} res
   * @returns dados do usuario criptografados em base 64
   */
  async verify(req = request, res = response) {
    try {
      const {email, code} = req.body;
      // console.log("\n\n", req.body);

      const storedCode = codeCache.get(email);

      console.log(storedCode);

      // Use 401 para credenciais inválidas, não 500
      if (!storedCode || storedCode == undefined || storedCode !== code) {
        return res
          .status(HttpStatusCode.Unauthorized)
          .json({message: "Código inválido ou expirado."});
      }
      //
      codeCache.del(email);

      // @ts-ignore
      const user = await Users.findOne({where: {email: email}});
      if (!user) {
        return res
          .status(HttpStatusCode.NotFound)
          .json({message: "User not found"});
      }

      const payload = {
        // @ts-ignore - erro de propriedade id
        id: user.id,
        // @ts-ignore - erro de propriedade name
        name: user.name,
        // @ts-ignore - erro de propriedade email
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: 900, // 900 - 15 min
      });

      return res
        .status(HttpStatusCode.Ok)
        .json({message: "Verified", auth: true, token});

      //
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatusCode.InternalServerError)
        .json({error: "Error verifying user code"});
    }
  }
}

export default new LoginController();
