import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://movie-streaming-men8.onrender.com";

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default API;
