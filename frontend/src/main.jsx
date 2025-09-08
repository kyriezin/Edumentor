import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Mentors from "./pages/Mentors.jsx";
import MentorProfile from "./pages/MentorProfile.jsx";
import Schedule from "./pages/Schedule.jsx";
import Feed from "./pages/Feed.jsx";
import Tracks from "./pages/Tracks.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <div>
      <h1>EduMentor</h1>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/mentors">Mentores</Link> |{" "}
        <Link to="/feed">Feed</Link> |{" "}
        <Link to="/tracks">Trilhas</Link> |{" "}
        <Link to="/about">Sobre</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/mentors/:id" element={<MentorProfile />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"));
