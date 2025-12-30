import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");

  // 🔍 SEARCH HANDLER
  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      if (location.pathname.startsWith("/genre/")) {
        navigate(`${location.pathname}?q=${query}`);
      } else {
        navigate(`/search?q=${query}`);
      }
      setQuery("");
    }
  };

  // 🔐 LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <span className="nav-brand">🎬 CineStream</span>
        <Link className="nav-link" to="/home">Home</Link>
        <Link className="nav-link" to="/profile">Profile</Link>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className="nav-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
