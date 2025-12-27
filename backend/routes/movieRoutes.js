const express = require("express");
const router = express.Router();

const {
  getAllMovies,
  getMovieById,
  getMoviesByGenre,
  searchMovies,
  cloudinaryWebhook,
} = require("../controllers/movieController");

// SEARCH FIRST
router.get("/search", searchMovies);

// FETCH MOVIES
router.get("/", getAllMovies);
router.get("/genre/:genre", getMoviesByGenre);
router.get("/:id", getMovieById);

// CLOUDINARY WEBHOOK
router.post("/cloudinary-webhook", cloudinaryWebhook);

module.exports = router;
