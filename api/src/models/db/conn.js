import { Sequelize } from "sequelize";

const sequelize = new Sequelize("key_manager_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connected");
} catch (error) {
  console.error("Não foi possível conectar:", error);
}

export default sequelize;
