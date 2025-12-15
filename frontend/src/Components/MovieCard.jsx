import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movie/${movie._id}`)}
    >
      <img src={movie.thumbnailUrl} alt={movie.title} />
      <h4>{movie.title}</h4>
    </div>
  );
};

export default MovieCard;
