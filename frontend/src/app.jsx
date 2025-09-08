import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>EduMentor</h1>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/mentors">Mentores</Link> |{" "}
        <Link to="/about">Sobre</Link>
      </nav>
      <Outlet />
    </div>
  );
}
