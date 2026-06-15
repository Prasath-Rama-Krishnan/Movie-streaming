import axios from "axios";

const rawApiUrl = import.meta.env.VITE_API_URL;
const defaultApiUrl = "https://movie-streaming-men8.onrender.com";
const API_BASE_URL = rawApiUrl && !/localhost|127\.0\.0\.1/.test(rawApiUrl)
  ? rawApiUrl
  : defaultApiUrl;

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default API;
