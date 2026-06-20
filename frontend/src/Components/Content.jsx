import React from "react";
import "./Content.css";
import useMovies from "../hooks/useMovies";
import { Link } from "react-router-dom";

function Content() {
  const movies = useMovies();

  // Group movies by category
  const sections = {};
  movies.forEach((movie) => {
    if (!sections[movie.primaryGenre]) sections[movie.primaryGenre] = [];
    sections[movie.primaryGenre].push(movie);
  });

  // Show only first 3 categories
  const landingSections = Object.entries(sections).slice(0, 3);

  return (
    <section className="content">
      {landingSections.map(([title, items]) => (
        <div key={title} className="content__section">
          <header className="content__section-header">
            <h2>{title}</h2>
          </header>

          <div className="content__carousel">
            {items.map((movie) => (
              <article key={movie._id} className="content__card">
                <Link to={`/movie/${movie._id}`}>
                  <img src={movie.posterUrl} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </Link>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Content;
