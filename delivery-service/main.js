import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cron from "node-cron";
dotenv.config();

// INITIALIZE SERVER
const app = express();
const PORT = process.env.PORT || 3000;

//SCHEDULE TASK

cron.schedule("*/30 * * * * *", () => {
  console.log("NODE CRON");
});

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

// CONEXION A LA BASE DE DATOS

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
