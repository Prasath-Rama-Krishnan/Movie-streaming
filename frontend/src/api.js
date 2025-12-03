import axios from "axios";

const API = axios.create({
  baseURL: "https://movie-streaming-men8.onrender.com/api/auth",
});

export default API;
