import axios from "axios";

const API = "http://localhost:5000/api/movies";

export const useMoviesApi = () => {

  const getAllMovies = async () => {
    const res = await axios.get(`${API}`);
    return res.data; // ARRAY
  };

  const getMoviesByGenre = async (genre) => {
    const res = await axios.get(`${API}/genre/${genre}`);
    return res.data; // ARRAY
  };

  const getMovieById = async (id) => {
    const res = await axios.get(`${API}/${id}`);
    return res.data; // OBJECT
  };

  const searchMovies = async (query) => {
    const res = await axios.get(`${API}/search?q=${query}`);
    return res.data; // ARRAY
  };

  return {
    getAllMovies,
    getMoviesByGenre,
    getMovieById,
    searchMovies,
  };
};
