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

      {/* 🎬 CLOUDINARY VIDEO */}
      {movie.videoUrl ? (
        <video
          src={movie.videoUrl}
          controls
          width="100%"
          height="450"
        />
      ) : (
        <p style={{ color: "gray" }}>Video not available</p>
      )}

      {/* 🎞️ MOVIE DETAILS */}
      <div className="movie-info">
        <img
          src={movie.posterUrl || "https://via.placeholder.com/300x450"}
          alt={movie.title}
          className="movie-poster"
        />

        <div className="movie-desc">
          <h1>{movie.title}</h1>
          <p>{movie.description || "No description available"}</p>
          <p><b>Genre:</b> {movie.genre}</p>
          <p><b>Year:</b> {movie.year}</p>
        </div>
      </div>

    </div>
  );
};

export default MoviePage;
