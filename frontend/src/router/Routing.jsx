import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Login from "../Auth/Login";
import OtpVerify from "../Auth/OtpVerify";
import Landing from "../pages/Landing";
import MoviePage from "../pages/MoviePage";
import GenrePage from "../pages/GenrePage";
import Search from "../pages/Search";

export default function Routing() {
  return (
    <Routes>

      {/* DEFAULT ENTRY */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<OtpVerify />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Landing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/movie/:id"
        element={
          <ProtectedRoute>
            <MoviePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/genre/:genre"
        element={
          <ProtectedRoute>
            <GenrePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}
