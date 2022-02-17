import { Sequelize } from "sequelize";
import setUpModels from "../models/index.js";

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

setUpModels(sequelize);

sequelize.sync();

export default sequelize;
