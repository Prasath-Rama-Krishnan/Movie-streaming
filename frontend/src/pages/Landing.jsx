import "./Landing.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMoviesApi } from "../hooks/useMovies";
import MovieCard from "../Components/MovieCard";

const Landing = () => {
  const { getAllMovies } = useMoviesApi();
  const navigate = useNavigate();

  const [action, setAction] = useState([]);
  const [romance, setRomance] = useState([]);
  const [comedy, setComedy] = useState([]);

  useEffect(() => {
    const load = async () => {
      const all = await getAllMovies();

      const byGenre = (g) =>
        all.filter(
          (m) =>
            m.primaryGenre &&
            m.primaryGenre.toLowerCase() === g.toLowerCase()
        );

      setAction(byGenre("Action").slice(0, 6));
      setRomance(byGenre("Romance").slice(0, 6));
      setComedy(byGenre("Comedy").slice(0, 6));
    };

    load();
  }, []);

  return (
    <div className="landing">
      <h2 className="section-title">
        💥 Action Movies
        <span className="see-more" onClick={() => navigate("/genre/Action")}>
          See more →
        </span>
      </h2>
      <div className="movie-row">
        {action.map((m) => <MovieCard key={m._id} movie={m} />)}
      </div>

      <h2 className="section-title">
        ❤️ Romantic Movies
        <span className="see-more" onClick={() => navigate("/genre/Romance")}>
          See more →
        </span>
      </h2>
      <div className="movie-row">
        {romance.map((m) => <MovieCard key={m._id} movie={m} />)}
      </div>

      <h2 className="section-title">
        😂 Comedy Movies
        <span className="see-more" onClick={() => navigate("/genre/Comedy")}>
          See more →
        </span>
      </h2>
      <div className="movie-row">
        {comedy.map((m) => <MovieCard key={m._id} movie={m} />)}
      </div>
    </div>
  );
};

export default Landing;
