import { useState } from "react";

export default function Schedule() {
  const [studentName, setStudentName] = useState("");
  const [mentorId, setMentorId] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3333/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentName, mentorId, date })
    });
    alert("Sessão agendada com sucesso!");
  };

  return (
    <div>
      <h2>Agendar Sessão</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Seu nome" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
        <input placeholder="ID do mentor" value={mentorId} onChange={(e) => setMentorId(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Agendar</button>
      </form>
    </div>
  );
}
