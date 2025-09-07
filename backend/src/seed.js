import { openDb } from "./db.js";
import bcrypt from "bcryptjs";

async function seed() {
  const db = await openDb();

  // Criar tabelas
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT
    );

    CREATE TABLE IF NOT EXISTS mentors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      bio TEXT,
      area TEXT,
      availableSlots TEXT,
      FOREIGN KEY(userId) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      studentId INTEGER,
      mentorId INTEGER,
      datetime TEXT,
      status TEXT
    );

    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      authorId INTEGER,
      text TEXT,
      createdAt TEXT
    );
  `);

  // Inserir dados de exemplo
  const pass = await bcrypt.hash("123456", 10);

  // Mentor
  await db.run(
    `INSERT OR IGNORE INTO users (id, name, email, password, role) VALUES (1, ?, ?, ?, ?)`,
    ["Dr. Mentor", "mentor@edu.com", pass, "mentor"]
  );
  await db.run(
    `INSERT OR IGNORE INTO mentors (userId, bio, area, availableSlots) VALUES (1, ?, ?, ?)`,
    ["Psicólogo com 10 anos de experiência", "Psicologia", "Seg,Ter,Qua"]
  );

  // Estudante
  await db.run(
    `INSERT OR IGNORE INTO users (id, name, email, password, role) VALUES (2, ?, ?, ?, ?)`,
    ["Juliana", "juliana@edu.com", pass, "student"]
  );

  console.log("🌱 Seed executado!");
  await db.close();
}

seed();
