import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMoviesApi } from "../hooks/useMovies";
import MovieCard from "../Components/MovieCard";
import "./Search.css";

const Search = () => {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const { searchMovies } = useMoviesApi();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const load = async () => {
      const results = await searchMovies(query);
      setMovies(results);
    };

    load();
  }, [query]);

  return (
    <div className="search-page">
      <h2>Search results for "{query}"</h2>

      <div className="movie-grid">
        {movies.length ? (
          movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
