const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./src/database.sqlite");

// Cria tabelas básicas se não existirem
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS mentors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    expertise TEXT,
    rating REAL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS feed (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS tracks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS schedule (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mentorId INTEGER,
    studentName TEXT,
    date TEXT,
    FOREIGN KEY (mentorId) REFERENCES mentors(id)
  )`);
});

module.exports = db;
