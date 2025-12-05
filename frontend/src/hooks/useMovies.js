import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/movies"; 
// change this when deploying

export default function useMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Movie fetch error:", err));
  }, []);

  return movies;
}
