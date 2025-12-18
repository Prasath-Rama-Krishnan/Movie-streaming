import "./Search.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMoviesApi } from "../hooks/useMovies";
import MovieCard from "../Components/MovieCard";

const Search = () => {
  const [params] = useSearchParams();
  const query = params.get("q");
  const { searchMovies } = useMoviesApi();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchMovies(query)
        .then((data) => setMovies(data || []))
        .finally(() => setLoading(false));
    }
  }, [query]);

  return (
    <div className="search-page">
      <h2 className="search-title">Results for "{query}"</h2>

      {loading && <p className="empty-text">Loading...</p>}

      {!loading && movies.length === 0 && (
        <p className="empty-text">❌ No movies found</p>
      )}

      <div className="search-grid">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Search;
