const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const movieController = require("../controllers/movieController");
const authMiddleware = require("../middleware/authMiddleware");

// Upload movie (poster + video) – protected route
router.post(
  "/upload",
  authMiddleware,
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  movieController.uploadMovie
);

// Get all movies
router.get("/", movieController.getMovies);

// Get a single movie
router.get("/:id", movieController.getMovieById);

module.exports = router;
