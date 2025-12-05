const Movie = require("../models/Movie");
const cloudinary = require("../utils/cloudinary");

exports.uploadMovie = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    if (!req.files.poster || !req.files.video) {
      return res.status(400).json({ message: "Poster and video required" });
    }

    // Upload poster
    const posterUpload = await cloudinary.uploader.upload(
      req.files.poster[0].path,
      { folder: "movie_posters" }
    );

    // Upload video
    const videoUpload = await cloudinary.uploader.upload(
      req.files.video[0].path,
      {
        resource_type: "video",
        folder: "movie_videos",
      }
    );

    const movie = await Movie.create({
      name,
      description,
      category,
      posterUrl: posterUpload.secure_url,
      videoUrl: videoUpload.secure_url,
    });

    res.json({ message: "Movie uploaded successfully", movie });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
