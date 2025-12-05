const express = require("express");
const cors = require("cors");
require("dotenv").config();

// DB connections
const connectDB = require("./config/db.js");

// Routes
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");

// Connect databases
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
