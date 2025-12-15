require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectAuthDB = require("./config/authDB");

// movieDB is auto-connected by createConnection
require("./config/movieDB");

const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send("🎬 Backend running");
});

const PORT = process.env.PORT || 5000;

connectAuthDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
