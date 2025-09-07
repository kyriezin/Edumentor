import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { openDb } from "./db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const SECRET = process.env.JWT_SECRET || "segredo";

// 🔑 Registro
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const db = await openDb();
  const hashed = await bcrypt.hash(password, 10);

  try {
    await db.run(
      "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
      [name, email, hashed, role]
    );
    res.json({ ok: true });
  } catch {
    res.status(400).json({ error: "Email já cadastrado" });
  }
});

// 🔑 Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const db = await openDb();
  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error: "Senha incorreta" });

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });
  res.json({ token, user });
});

// 👨‍🏫 Listar mentores
app.get("/api/mentors", async (req, res) => {
  const db = await openDb();
  const { area } = req.query;
  const mentors = await db.all(
    area ? "SELECT * FROM mentors WHERE area=?" : "SELECT * FROM mentors",
    area ? [area] : []
  );
  res.json(mentors);
});

// 👨‍🏫 Ver perfil do mentor
app.get("/api/mentor/:id", async (req, res) => {
  const db = await openDb();
  const mentor = await db.get("SELECT * FROM mentors WHERE id=?", [req.params.id]);
  res.json(mentor);
});

// 📅 Agendar
app.post("/api/mentor/:id/book", async (req, res) => {
  const { studentId, datetime } = req.body;
  const db = await openDb();
  await db.run(
    "INSERT INTO bookings (studentId, mentorId, datetime, status) VALUES (?,?,?,?)",
    [studentId, req.params.id, datetime, "scheduled"]
  );
  res.json({ ok: true });
});

// 📰 Feed
app.get("/api/feed", async (req, res) => {
  const db = await openDb();
  const posts = await db.all("SELECT * FROM posts ORDER BY createdAt DESC");
  res.json(posts);
});

app.post("/api/feed", async (req, res) => {
  const { authorId, text } = req.body;
  const db = await openDb();
  await db.run(
    "INSERT INTO posts (authorId,text,createdAt) VALUES (?,?,datetime('now'))",
    [authorId, text]
  );
  res.json({ ok: true });
});

app.listen(3333, () => console.log("🚀 Backend rodando em http://localhost:3333"));
