import React from "react";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Profile from "./components/Profile";
import About from "./components/about";

export default function App() {
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
