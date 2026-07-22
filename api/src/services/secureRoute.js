import {request, response} from "express";
import jwt from "jsonwebtoken";

function secureRoute(req = request, res = response, next) {
  // O token geralmente é enviado no header Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({auth: false, message: "Nenhum token fornecido."});
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({auth: false, message: "Token inválido ou expirado."});
    }

    // Armazena o ID do usuário na requisição para uso nas rotas seguintes

    // @ts-ignore
    req.userId = decoded.id;
    next();
  });
}

export default secureRoute;
