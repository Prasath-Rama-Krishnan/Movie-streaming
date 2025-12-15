import "./GenrePage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import { useMoviesApi } from "../hooks/useMovies";

const GenrePage = () => {
  const { genre } = useParams();
  const { getMoviesByGenre } = useMoviesApi();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchGenre() {
      setMovies((await getMoviesByGenre(genre)) || []);
    }
    fetchGenre();
  }, [genre]);

  return (
    <div className="genre-page">
      <h1 className="genre-title">{genre} Movies</h1>

      <div className="genre-grid">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
