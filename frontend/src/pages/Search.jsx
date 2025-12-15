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

  useEffect(() => {
    if (query) {
      searchMovies(query).then(setMovies);
    }
  }, [query]);

  return (
    <div className="search-page">
      <h2 className="search-title">Results for "{query}"</h2>

      <div className="search-grid">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Search;
