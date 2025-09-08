const express = require("express");
const router = express.Router();
const db = require("./db");

// ----------------- Mentores -----------------
router.get("/mentors", (req, res) => {
  db.all("SELECT * FROM mentors", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post("/mentors", (req, res) => {
  const { name, expertise, rating } = req.body;
  db.run(
    "INSERT INTO mentors (name, expertise, rating) VALUES (?, ?, ?)",
    [name, expertise, rating || 5],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, expertise, rating });
    }
  );
});

router.get("/mentors/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM mentors WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// ----------------- Feed -----------------
router.get("/feed", (req, res) => {
  db.all("SELECT * FROM feed", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ----------------- Trilhas -----------------
router.get("/tracks", (req, res) => {
  db.all("SELECT * FROM tracks", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ----------------- Agendamentos -----------------
router.post("/schedule", (req, res) => {
  const { mentorId, studentName, date } = req.body;
  db.run(
    "INSERT INTO schedule (mentorId, studentName, date) VALUES (?, ?, ?)",
    [mentorId, studentName, date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, mentorId, studentName, date });
    }
  );
});

router.get("/schedule", (req, res) => {
  db.all("SELECT * FROM schedule", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
