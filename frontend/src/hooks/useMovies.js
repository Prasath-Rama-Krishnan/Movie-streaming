import axios from "axios";

const API = "http://localhost:5000/api/movies";

export const useMoviesApi = () => {

  const getAllMovies = async () => {
    const res = await axios.get(`${API}`);
    return res.data;
  };

  // 🔥 UPDATED: supports limit
  const getMoviesByGenre = async (genre, limit) => {
    let url = `${API}/genre/${genre}`;
    if (limit) {
      url += `?limit=${limit}`;
    }

    const res = await axios.get(url);
    return res.data;
  };

  const getMovieById = async (id) => {
    const res = await axios.get(`${API}/${id}`);
    return res.data;
  };

  const searchMovies = async (query, genre) => {
    let url = `${API}/search?q=${query}`;

    if (genre) {
      url += `&genre=${genre}`;
    }

    const res = await axios.get(url);
    return res.data;
  };

  return {
    getAllMovies,
    getMoviesByGenre,
    getMovieById,
    searchMovies,
  };
};
