require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

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
];

app.use(
  cors({
<<<<<<< HEAD
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy: origin not allowed"), false);
    },
=======
    origin: "https://movie-streaming-men8.onrender.com",
>>>>>>> e0eb605 (Updated backend and frontend changes)
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

const startServer = async () => {
  await connectDB();
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
