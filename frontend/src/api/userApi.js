import API from "./api";

export const getProfile = () =>
  API.get("/user/profile", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const getWatchLater = () =>
  API.get("/user/watch-later", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const addWatchLater = (movieId) =>
  API.post(
    `/user/watch-later/${movieId}`,
    {},
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );

export const removeWatchLater = (movieId) =>
  API.delete(`/user/watch-later/${movieId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
