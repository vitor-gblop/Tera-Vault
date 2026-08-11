import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import path from "path";
import {fileURLToPath} from "url";
import database from "./src/models/db/conn.js";

// Modelos
import Historic from "./src/models/historic.js";
import Keys from "./src/models/keys.js";
import Users from "./src/models/users.js";

// Swagger
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tera Vault API",
      version: "1.0.0",
      description:
        "Documentação da rotas principais da API com Express e Swagger",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      // security: [{bearerAuth: []}],
    },
  },
  apis: ["./routes/*.js"], // Caminho para os arquivos com as rotas documentadas
};
const swaggerSpec = swaggerJSDoc(options);

// Inicializar modelos
Keys.initialize(database);
Users.initialize(database);
Historic.initialize(database);

// Rotas
import indexRouter from "./routes/index.js";

app.use(cors({origin: ["http://localhost:5173"]}));
app.use(logger("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//
app.use("/", indexRouter);
// Rota onde o Swagger UI será disponibilizado
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Criar tabelas e rodar o app
database
  .sync()
  .then(() => console.log("\nTables created"))
  .catch((err) => console.log(err));

export default app;
