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

app.post("/registro", async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO usuarios (name, email, password, phone) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, phone],
      (err) => {
        if (err) return res.status(500).json({ message: "Error al registrar" });
        res.status(201).json({ message: "Usuario registrado exitosamente" });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "Error en el servidor" });

      if (results.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "secreto_super_seguro",
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ message: "Login exitoso", token });
    }
  );
});

app.post("/agendar", (req, res) => {
  const { doctor, fecha } = req.body;

  if (!doctor || !fecha) {
    return res.status(400).json({ message: "Doctor y fecha son requeridos" });
  }

  db.query(
    "INSERT INTO horasagendadas (doctor, fecha) VALUES (?, ?)",
    [doctor, fecha],
    (err) => {
      if (err) {
        console.error("Error al guardar la hora agendada:", err);
        return res.status(500).json({ message: "Error al guardar la cita" });
      }

      res.status(201).json({ message: "Cita agendada exitosamente" });
    }
  );
});

app.get("/mishoras", (req, res) => {
  const query = `
    SELECT id, doctor, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha
    FROM horasagendadas
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener las horas agendadas:", err);
      return res.status(500).json({ message: "Error al obtener las horas" });
    }
    res.status(200).json(results);
  });
});

app.delete("/cancelarhora/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM horasagendadas WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("Error al cancelar la hora agendada:", err);
      return res.status(500).json({ message: "Error al cancelar la hora" });
    }
    res.status(200).json({ message: "Hora cancelada exitosamente" });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
