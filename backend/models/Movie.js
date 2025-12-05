const mongoose = require("mongoose");
const movieDB = require("../config/movieDB");

const MovieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  posterUrl: String,     // Cloudinary image URL
  videoUrl: String,      // Cloudinary video URL
  createdAt: { type: Date, default: Date.now }
});

module.exports = movieDB.model("Movie", MovieSchema);
