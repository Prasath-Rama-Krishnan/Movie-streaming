import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
