const Movie = require("../models/Movie");
const fetchMovieFromOMDb = require("../services/omdbService");

/* =========================
   GENRE RESOLUTION
========================= */
const resolvePrimaryGenre = (genreString = "") => {
  const genres = genreString
    .split(",")
    .map(g => g.trim().toLowerCase());

  const priority = [
    "action",
    "romance",
    "comedy",
    "thriller",
    "crime",
    "drama",
    "musical",
    "fantasy",
    "adventure",
  ];

  for (const p of priority) {
    if (genres.includes(p)) {
      return p.charAt(0).toUpperCase() + p.slice(1);
    }
  }

  return "Other";
};

/* =========================
   TITLE NORMALIZATION
========================= */
const normalizeTitle = (rawTitle) => {
  const searchTitle = rawTitle.trim();

  const displayTitle = rawTitle
    .replace(/\(Tamil\)/gi, "")
    .replace(/\(Hindi\)/gi, "")
    .replace(/\(Telugu\)/gi, "")
    .replace(/\(USA\)/gi, "")
    .replace(/\(\d{4}\)/g, "")
    .trim();

  return { searchTitle, displayTitle };
};

/* =========================
   GET ALL MOVIES
========================= */
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 }).lean();
    res.json({ results: movies });
  } catch {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

/* =========================
   GET MOVIE BY ID
========================= */
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).lean();
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch {
    res.status(500).json({ message: "Failed to fetch movie" });
  }
};

/* =========================
   SEARCH MOVIES
========================= */
exports.searchMovies = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ results: [] });

    const movies = await Movie.find({
      title: { $regex: q, $options: "i" },
    }).lean();

    res.json({ results: movies });
  } catch {
    res.status(500).json({ message: "Search failed" });
  }
};

/* =========================
   GET MOVIES BY GENRE
========================= */
exports.getMoviesByGenre = async (req, res) => {
  try {
    const movies = await Movie.find({
      primaryGenre: req.params.genre,
    }).lean();

    res.json({ results: movies });
  } catch {
    res.status(500).json({ message: "Failed to fetch movies by genre" });
  }
};

/* =========================
   CLOUDINARY WEBHOOK
   (HANDLES VIDEOS & POSTERS)
========================= */
exports.cloudinaryWebhook = async (req, res) => {
  try {
    const { secure_url, resource_type, folder } = req.body;

    // Handle VIDEO uploads - create new movie
    if (resource_type === "video") {
      const fileName = secure_url.split("/").pop();
      const rawTitle = decodeURIComponent(fileName.replace(/\.[^/.]+$/, ""));
      const { searchTitle, displayTitle } = normalizeTitle(rawTitle);

      // ✅ Prevent duplicate movies by title
      const exists = await Movie.findOne({
        title: new RegExp(`^${displayTitle}$`, "i"),
      });

      if (exists) {
        console.log("⛔ Duplicate ignored:", displayTitle);
        return res.sendStatus(200);
      }

      const movie = await Movie.create({
        title: displayTitle,
        videoUrl: secure_url,
        primaryGenre: "Other",
      });

      const omdbData = await fetchMovieFromOMDb(searchTitle);
      if (omdbData) {
        movie.genre = omdbData.genre;
        movie.primaryGenre = resolvePrimaryGenre(omdbData.genre);
        movie.description = omdbData.description;
        movie.posterUrl = omdbData.posterUrl;
        movie.year = omdbData.year;
        movie.language = omdbData.language;
        await movie.save();
      }

      console.log(`🎬 Added: ${displayTitle} → ${movie.primaryGenre}`);
      return res.sendStatus(200);
    }

    // Handle IMAGE/POSTER uploads - update existing movie
    if (resource_type === "image") {
      const fileName = secure_url.split("/").pop();
      const rawTitle = decodeURIComponent(fileName.replace(/\.[^/.]+$/, ""));
      
      // Remove "_poster" suffix if present for matching
      const displayTitle = rawTitle
        .replace(/_poster$/i, "")
        .replace(/\(Tamil\)/gi, "")
        .replace(/\(Hindi\)/gi, "")
        .replace(/\(Telugu\)/gi, "")
        .replace(/\(USA\)/gi, "")
        .replace(/\(\d{4}\)/g, "")
        .trim();

      // Find and update the movie with this poster
      const movie = await Movie.findOneAndUpdate(
        { title: new RegExp(`^${displayTitle}$`, "i") },
        { posterUrl: secure_url },
        { new: true }
      );

      if (movie) {
        console.log(`🖼️  Updated poster: ${displayTitle}`);
      } else {
        console.log(`⚠️  Movie not found for poster: ${displayTitle}`);
      }

      return res.sendStatus(200);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Webhook failed:", error.message);
    res.status(500).send("Webhook failed");
  }
};
