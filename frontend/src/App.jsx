import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Auth/Login";
import OtpVerify from "./Auth/OtpVerify";

import Landing from "./pages/Landing";
import GenrePage from "./pages/GenrePage";
import MoviePage from "./pages/MoviePage";
import Search from "./pages/Search";

import ProtectedRoute from "./router/ProtectedRoute";
import AppLayout from "./layout/AppLayout";

function App() {
  return (
    <Routes>
      {/* AUTH ROUTES (NO NAVBAR) */}
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<OtpVerify />} />

      {/* APP ROUTES (WITH NAVBAR) */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Landing />} /> {/* ✅ FIX */}
        <Route path="/genre/:genre" element={<GenrePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/search" element={<Search />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
