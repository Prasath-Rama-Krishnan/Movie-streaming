import axios from "axios";

const API = "https://movie-streaming-men8.onrender.com/api/movies";

export const useMoviesApi = () => {

  /* =========================
     GET ALL MOVIES
  ========================= */
  const getAllMovies = async () => {
    try {
      const res = await axios.get(API);
      return res.data.results || [];
    } catch (err) {
      console.error("Failed to fetch movies:", err.message);
      return [];
    }
  };

  /* =========================
     GET MOVIES BY PRIMARY GENRE
     /api/movies/genre/:genre
  ========================= */
  const getMoviesByGenre = async (genre) => {
    try {
      const res = await axios.get(`${API}/genre/${genre}`);
      return res.data.results || [];
    } catch (err) {
      console.error("Failed to fetch genre movies:", err.message);
      return [];
    }
  };

  /* =========================
     GET MOVIE BY ID
     /api/movies/:id
  ========================= */
  const getMovieById = async (id) => {
    try {
      const res = await axios.get(`${API}/${id}`);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch movie:", err.message);
      return null;
    }
  };

  /* =========================
     GLOBAL SEARCH (LANDING)
     /api/movies/search?q=
  ========================= */
  const searchMovies = async (query) => {
    try {
      if (!query || !query.trim()) return [];
      const res = await axios.get(`${API}/search?q=${query.trim()}`);
      return res.data.results || [];
    } catch (err) {
      console.error("Search failed:", err.message);
      return [];
    }
  };

  /* =========================
     SEARCH INSIDE GENRE (CLIENT SIDE)
  ========================= */
  const searchMoviesInGenre = async (genre, query) => {
    try {
      if (!query || !query.trim()) return getMoviesByGenre(genre);

      const movies = await getMoviesByGenre(genre);
      return movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    } catch (err) {
      console.error("Genre search failed:", err.message);
      return [];
    }
  };

  return {
    getAllMovies,
    getMoviesByGenre,
    getMovieById,
    searchMovies,
    searchMoviesInGenre,
  };
};
