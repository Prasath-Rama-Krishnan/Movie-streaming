import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMoviesApi } from "../hooks/useMovies";
import MovieCard from "../Components/MovieCard";
import "./GenrePage.css";

const GenrePage = () => {
  const { genre } = useParams();
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  const { getMoviesByGenre } = useMoviesApi();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const load = async () => {
      // ✅ get movies of this genre ONLY
      let data = await getMoviesByGenre(genre);

      // ✅ ADD: search inside genre
      if (query) {
        data = data.filter((m) =>
          m.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      setMovies(data || []);
    };

    load();
  }, [genre, query]);

  return (
    <div className="genre-page">
      <h2>{genre} Movies</h2>

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default GenrePage;
