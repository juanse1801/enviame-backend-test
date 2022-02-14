import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import sequelize from "./src/database/db.js";
dotenv.config();

// INITIALIZE SERVER
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "authorization",
    ],
  })
);

// CONEXION A LA BASE DE DATOS
sequelize
  .authenticate()
  .then(() => {
    console.log("CONECTADO A LA BASE DE DATOS");
  })
  .catch((e) => {
    console.log("SE HA PRODUCIDO UN ERROR", e);
  });

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
