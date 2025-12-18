import "./Landing.css";
import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import { useMoviesApi } from "../hooks/useMovies";

const Landing = () => {
  const { getMoviesByGenre } = useMoviesApi();

  const [epic, setEpic] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [action, setAction] = useState([]);

  useEffect(() => {
    async function load() {
      setEpic(await getMoviesByGenre("Epic", 6));
      setComedy(await getMoviesByGenre("Comedy", 6));
      setAction(await getMoviesByGenre("Action", 6));
    }
    load();
  }, []);

  return (
    <div className="landing-container">
      <Section title="🔥 Epic Movies" movies={epic} genre="Epic" />
      <Section title="😂 Comedy Movies" movies={comedy} genre="Comedy" />
      <Section title="💥 Action Movies" movies={action} genre="Action" />
    </div>
  );
};

const Section = ({ title, movies, genre }) => (
  <div className="section">
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <a href={`/genre/${genre}`} className="view-more">
        View More →
      </a>
    </div>

    <div className="movie-row">
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  </div>
);

export default Landing;
