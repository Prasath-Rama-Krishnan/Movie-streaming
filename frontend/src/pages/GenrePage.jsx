import "./GenrePage.css";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import { useMoviesApi } from "../hooks/useMovies";

const GenrePage = () => {
  const { genre } = useParams();
  const [params] = useSearchParams();
  const query = params.get("q");

  const { getMoviesByGenre, searchMovies } = useMoviesApi();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);

      let data;
      if (query) {
        data = await searchMovies(query, genre);
      } else {
        data = await getMoviesByGenre(genre);
      }

      setMovies(data || []);
      setLoading(false);
    }

    fetchMovies();
  }, [genre, query]);

  return (
    <div className="genre-page">
      <h1 className="genre-title">{genre} Movies</h1>

      {loading && <p className="empty-text">Loading...</p>}

      {!loading && movies.length === 0 && (
        <p className="empty-text">❌ No movies found in {genre}</p>
      )}

      <div className="genre-grid">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
