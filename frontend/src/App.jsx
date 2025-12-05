import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";          // <-- Add this
import OtpVerify from "./Auth/OtpVerify";
import Landing from "./Landing";
import Search from "./pages/Search";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />        {/* Login page */}
        <Route path="/verify-otp" element={<OtpVerify />} /> 
        <Route path="/landing" element={<Landing />} /> 
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
