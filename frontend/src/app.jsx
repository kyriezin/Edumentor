import React from "react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>EduMentor</h1>
      <p>Conectando estudantes a mentores acadêmicos.</p>
      <nav>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Registrar</Link> |{" "}
        <Link to="/mentors">Mentores</Link> |{" "}
        <Link to="/feed">Feed</Link>
      </nav>
    </div>
  );
}
