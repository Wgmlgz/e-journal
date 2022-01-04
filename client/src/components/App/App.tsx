import React, { useState, useEffect } from "react";
import Teacher from "../Teacher/Teacher";
import Login from "./Auth/Login";
import { Link, Route, BrowserRouter, Routes } from "react-router-dom";
import Register from "./Auth/Register";
import Dashboard from "./Auth/Dashboard";
import Bar from "./Bar";
import AdminLessons from "../Admin/AdminLessons";
import AdminUsers from "../Admin/AdminUsers";
import Student from "../Student/Student";

function App() {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Bar />
      <div
        style={{
          height: "calc(100vh - 50px)",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/admin/lessons" element={<AdminLessons />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/teacher/lessons" element={<Teacher />} />
            <Route path="/student/lessons" element={<Student />} />
            <Route path="/admin" element={<AdminLessons />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
