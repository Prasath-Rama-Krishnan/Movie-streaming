require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Movie = require("./models/Movie");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");

const app = express();

/* ===========================
   MIDDLEWARE
=========================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const FRONTEND_URL = process.env.FRONTEND_URL || "https://movie-streaming-ten.vercel.app";
const allowedOrigins = [
  FRONTEND_URL,
  "https://movie-streaming-ten.vercel.app",
  "http://localhost:5173",
  "https://movie-streaming-men8.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy: origin not allowed"), false);
    },
    credentials: true,
  })
);

/* ===========================
   ROUTES
=========================== */
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/user", require("./routes/userRoutes"));

/* ===========================
   SERVER
=========================== */
const PORT = process.env.PORT || 5000;

const seedMovies = async () => {
  const count = await Movie.countDocuments();
  if (count > 0) return;

  const sampleMovies = [
    {
      title: "Petta",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "A police officer takes on a criminal kingpin.",
      year: "2019",
      genre: "Action, Drama",
      primaryGenre: "Action",
      posterUrl: "https://dummyimage.com/300x450/111/fff&text=Petta",
      director: "Karthik Subbaraj",
      actors: "Rajinikanth, Vijay Sethupathi",
      imdbRating: "7.5",
      language: "Tamil",
    },
    {
      title: "Soodhu Kavvum",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      description: "A dark comedy about a group of bumbling kidnappers.",
      year: "2013",
      genre: "Comedy, Crime, Thriller",
      primaryGenre: "Comedy",
      posterUrl: "https://dummyimage.com/300x450/111/fff&text=Soodhu+Kavvum",
      director: "Nalan Kumarasamy",
      actors: "Vijay Sethupathi, Sanchita Shetty",
      imdbRating: "8.0",
      language: "Tamil",
    },
  ];

  await Movie.insertMany(sampleMovies);
  console.log(`Seeded ${sampleMovies.length} movies`);
};

const startServer = async () => {
  await connectDB();
  await seedMovies();
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use. Stop the other server or set a different PORT in .env.`
      );
    } else {
      console.error("Server error:", err);
    }
    process.exit(1);
  });
};

startServer();
