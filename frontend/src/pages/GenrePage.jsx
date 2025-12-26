import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMoviesApi } from "../hooks/useMovies";
import MovieCard from "../Components/MovieCard";
import "./GenrePage.css";

const GenrePage = () => {
  const { genre } = useParams();
  const { getAllMovies } = useMoviesApi();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const load = async () => {
      const all = await getAllMovies();
      setMovies(
        all.filter(
          (m) =>
            m.primaryGenre &&
            m.primaryGenre.toLowerCase() === genre.toLowerCase()
        )
      );
    };

    load();
  }, [genre]);

  return (
    <div className="genre-page">
      <h2>{genre} Movies</h2>
      <div className="movie-grid">
        {movies.map((m) => <MovieCard key={m._id} movie={m} />)}
      </div>
    </div>
  );
};

export default GenrePage;
