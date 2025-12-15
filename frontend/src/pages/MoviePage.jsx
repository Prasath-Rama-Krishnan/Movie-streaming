import "./MoviePage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMoviesApi } from "../hooks/useMovies";

const MoviePage = () => {
  const { id } = useParams();
  const { getMovieById } = useMoviesApi();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieById(id).then(setMovie);
  }, [id]);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div className="movie-page">

      {/* FULL WIDTH VIDEO FIRST */}
      <video
        className="movie-video"
        src={movie.videoUrl}
        controls
      />

      {/* TITLE SECTION */}
      <div className="movie-header">
        <h1>{movie.title}</h1>
        <span className="movie-meta">
          {movie.year} • 2h 15m
        </span>
      </div>

      {/* POSTER + CONTENT */}
      <div className="movie-info">
        <img
          src={movie.thumbnailUrl}
          className="movie-poster"
          alt={movie.title}
        />

        <div className="movie-desc">
          <h3>About the movie</h3>
          <p>{movie.description}</p>
        </div>
      </div>

    </div>
  );
};

export default MoviePage;
