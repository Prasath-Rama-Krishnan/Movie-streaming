import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

const FALLBACK =
  "https://via.placeholder.com/300x450/111/ffffff?text=No+Poster";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie._id}`)}>
      <img
        src={movie.posterUrl || FALLBACK}
        alt={movie.title}
        onError={(e) => (e.target.src = FALLBACK)}
      />
      <h4>{movie.title}</h4>
    </div>
  );
};

export default MovieCard;
