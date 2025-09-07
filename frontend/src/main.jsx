import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MentorList from "./pages/MentorList";
import MentorProfile from "./pages/MentorProfile";
import Feed from "./pages/Feed";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mentors" element={<MentorList />} />
      <Route path="/mentor/:id" element={<MentorProfile />} />
      <Route path="/feed" element={<Feed />} />
    </Routes>
  </BrowserRouter>
);
