import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
// Screens
import TripRoutes from "./screens/TripRoutes.jsx";
import Login from "./screens/Login.jsx";
import Register from "./screens/Register.jsx";
import VerifyOTP from "./screens/VerifyOTP.jsx";
import Trips from "./screens/Trips.jsx";
import Profile from "./screens/Profile.jsx";

export default function App() {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet"></link>
      </Helmet>
      <Routes>
        <Route path="/" element={<TripRoutes />} />
        <Route path="/routes" element={<TripRoutes />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/otp" element={<VerifyOTP />} />
      </Routes>
    </>
  );
}

