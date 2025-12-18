const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

/* GET ALL MOVIES */
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

/* GET MOVIES BY GENRE (WITH OPTIONAL LIMIT) */
router.get("/genre/:genre", async (req, res) => {
  const limit = parseInt(req.query.limit) || 0;

  const movies = await Movie.find({ genre: req.params.genre })
    .limit(limit);

  res.json(movies);
});

/* SEARCH MOVIES (GLOBAL + GENRE) */
router.get("/search", async (req, res) => {
  const { q, genre } = req.query;

  const filter = {
    title: { $regex: q || "", $options: "i" },
  };

  if (genre) {
    filter.genre = genre;
  }

  const movies = await Movie.find(filter);
  res.json(movies);
});

/* GET MOVIE BY ID */
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
});

module.exports = router;
