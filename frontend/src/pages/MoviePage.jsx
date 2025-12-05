import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-page">
      <Navbar />

      <div className="movie-content">
        <h1>{movie.name}</h1>
        <p>{movie.description}</p>

        <video
          width="100%"
          height="auto"
          controls
          src={movie.videoUrl}
        />

      </div>
    </div>
  );
}

export default MoviePage;
