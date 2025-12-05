import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import useMovies from "../hooks/useMovies";
import "./Search.css";

function Search() {
  const movies = useMovies();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();

  const results = query
    ? movies.filter((movie) =>
        movie.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="landing-page">
      <Navbar />

      <main className="content">
        <div className="content__section">
          <h2>
            {query
              ? `Search results for "${query}"`
              : "Search for a movie"}
          </h2>

          {query && results.length === 0 && <p>No results found.</p>}

          <div className="content__carousel">
            {results.map((movie) => (
              <article key={movie._id} className="content__card">
                <Link to={`/movie/${movie._id}`}>
                  <img src={movie.posterUrl} alt={movie.name} />
                  <h3>{movie.name}</h3>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Search;
