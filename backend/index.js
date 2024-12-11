import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "basededatos",
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err.message);
    process.exit(1);
  }
  console.log("Conectado a la base de datos");
});

app.get("/", (req, res) => {
  res.send("El servidor está funcionando correctamente.");
});

// Resto de tus endpoints...

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
