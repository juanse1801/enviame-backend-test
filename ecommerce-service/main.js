import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import sequelize from "./src/database/db.js";
import routesConfig from "./src/routes/index.js";
import morgan from "morgan";
dotenv.config();

// INITIALIZE SERVER
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
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

//RUTAS
routesConfig(app);

// CONEXION A LA BASE DE DATOS
await sequelize
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
