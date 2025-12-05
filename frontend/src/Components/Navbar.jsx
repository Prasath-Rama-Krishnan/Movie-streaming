import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const navLinks = [
  { id: "home", label: "Home", to: "/landing" },
  { id: "tv", label: "TV Series", to: "#tv-series" },
  { id: "movies", label: "Movies", to: "#movies" },
];

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
  };

  return (
    <header className="navbar">
      <Link to="/landing" className="navbar__brand">
        <span className="navbar__logo-text">AJJ MOVIES</span>
      </Link>

      <nav className="navbar__links">
        {navLinks.map(({ id, label, to }) =>
          to.startsWith("#") ? (
            <a key={id} href={to} className="navbar__link">
              {label}
            </a>
          ) : (
            <Link key={id} to={to} className="navbar__link">
              {label}
            </Link>
          )
        )}
      </nav>

      <div className="navbar__actions">
        {isSearchOpen ? (
          <form className="navbar__search" role="search" onSubmit={handleSearchSubmit}>
            <button type="submit" aria-label="Search">
              <svg viewBox="0 0 24 24">
                <path
                  d="M21 21l-4.3-4.3m1.8-4.7a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <input
              placeholder="Search Movies & Series"
              autoFocus
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button
              type="button"
              className="navbar__search-clear"
              aria-label="Close search"
              onClick={() => setIsSearchOpen(false)}
            >
              <svg viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        ) : (
          <button
            type="button"
            className="navbar__icon"
            aria-label="Open search"
            onClick={() => setIsSearchOpen(true)}
          >
            <svg viewBox="0 0 24 24">
              <path
                d="M21 21l-4.3-4.3m1.8-4.7a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <Link to="/" className="navbar__signout">
          Sign out
        </Link>
      </div>
    </header>
  );
}

export default Navbar;