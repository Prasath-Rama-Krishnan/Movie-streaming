import API from "../api/api";

export const useMoviesApi = () => {

  /* =========================
     GET ALL MOVIES
  ========================= */
  const getAllMovies = async () => {
    try {
      const res = await API.get("/movies");
      return res.data.results || [];
    } catch (err) {
      console.error("Failed to fetch movies:", err.response?.status, err.message);
      return [];
    }
  };

  /* =========================
     GET MOVIES BY PRIMARY GENRE
     /api/movies/genre/:genre
  ========================= */
  const getMoviesByGenre = async (genre) => {
    try {
      const res = await API.get(`/movies/genre/${genre}`);
      return res.data.results || [];
    } catch (err) {
      console.error("Failed to fetch genre movies:", err.response?.status, err.message);
      return [];
    }
  };

  /* =========================
     GET MOVIE BY ID
     /api/movies/:id
  ========================= */
  const getMovieById = async (id) => {
    try {
      const res = await API.get(`/movies/${id}`);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch movie:", err.response?.status, err.message);
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
      const res = await API.get(`/movies/search?q=${encodeURIComponent(query.trim())}`);
      return res.data.results || [];
    } catch (err) {
      console.error("Search failed:", err.response?.status, err.message);
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
