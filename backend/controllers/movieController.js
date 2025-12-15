// controllers/movieController.js
const Movie = require("../models/Movie");
const mongoose = require("mongoose");

// GET all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json({ results: movies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET movies by genre
exports.getMoviesByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const limit = parseInt(req.query.limit) || 0;

    const movies = await Movie.find({ genre }).limit(limit);
    res.json({ results: movies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SEARCH movies
exports.searchMovies = async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.json({ results: [] });

    const movies = await Movie.find(
      { $text: { $search: q } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    res.json({ results: movies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET movie by id
exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ message: "Invalid ID" });

    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
