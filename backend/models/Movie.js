const mongoose = require("mongoose");
const movieDB = require("../config/movieDB");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: Number,
    genre: { type: String, required: true },
    description: String,

    videoUrl: String,
    videoPublicId: String,

    thumbnailUrl: String,
    thumbnailPublicId: String,

    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

MovieSchema.index({ title: "text", description: "text" });

module.exports = movieDB.model("Movie", MovieSchema);
