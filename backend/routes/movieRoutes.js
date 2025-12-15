const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

/* GET ALL MOVIES */
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

/* GET MOVIES BY GENRE */
router.get("/genre/:genre", async (req, res) => {
  const movies = await Movie.find({ genre: req.params.genre });
  res.json(movies);
});

/* SEARCH MOVIES */
router.get("/search", async (req, res) => {
  const { q } = req.query;

  const movies = await Movie.find({
    title: { $regex: q, $options: "i" },
  });

  res.json(movies);
});

/* GET MOVIE BY ID */
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
});

module.exports = router;
