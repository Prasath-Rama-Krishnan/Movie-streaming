const express = require("express");
const router = express.Router();

const {
  getAllMovies,
  getMovieById,
  getMoviesByGenre,
  searchMovies,
  addMovieByVideoUrl,
  cloudinaryWebhook,
} = require("../controllers/movieController");

// ✅ SEARCH FIRST
router.get("/search", searchMovies);

// ✅ FETCH MOVIES
router.get("/", getAllMovies);
router.get("/genre/:genre", getMoviesByGenre);
router.get("/:id", getMovieById);

// OPTIONAL
router.post("/add-by-video", addMovieByVideoUrl);

// WEBHOOK
router.post("/cloudinary-webhook", cloudinaryWebhook);

module.exports = router;
