import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import database from "./src/models/db/conn.js";

// Modelos
import Historic from "./src/models/historic.js";
import Keys from "./src/models/keys.js";
import Users from "./src/models/users.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Inicializar modelos
Keys.initialize(database);
Users.initialize(database);
Historic.initialize(database);

// Rotas
import indexRouter from "./routes/index.js";

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//
app.use("/", indexRouter);

// Criar tabelas e rodar o app
database
  .sync()
  .then(() => console.log("\nTables created"))
  .catch((err) => console.log(err));

export default app;
