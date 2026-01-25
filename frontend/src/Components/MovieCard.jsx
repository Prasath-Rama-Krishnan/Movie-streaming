import "./MovieCard.css";
import { useNavigate } from "react-router-dom";
import { addWatchLater } from "../api/userApi";

const FALLBACK =
  "https://dummyimage.com/300x450/111/fff&text=No+Poster";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleWatchLater = async (e) => {
    e.stopPropagation();
    try {
      await addWatchLater(movie._id);
      alert("Added to Watch Later");
    } catch {
      alert("Please login again");
    }
  };

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movie/${movie._id}`)}
    >
      <img
        src={movie.posterUrl || FALLBACK}
        alt={movie.title}
        onError={(e) => (e.target.src = FALLBACK)}
      />

      {/* 🔲 OVERLAY */}
      <div className="movie-overlay">
        <h4>{movie.title}</h4>

        <button
          className="watchlater-btn"
          onClick={handleWatchLater}
        >
          + Watch Later
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
