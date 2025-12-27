const axios = require("axios");

const fetchMovieFromOMDb = async (title) => {
  try {
    const cleanTitle = title
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const res = await axios.get("https://www.omdbapi.com/", {
      params: {
        t: cleanTitle,
        apikey: process.env.OMDB_API_KEY,
        type: "movie",
      },
      timeout: 5000,
    });

    const data = res.data;

    if (data.Response === "False") {
      console.log(`❌ OMDb not found: ${cleanTitle}`);
      return null;
    }

    // ✅ Allow only Tamil movies
    if (!data.Language || !data.Language.toLowerCase().includes("tamil")) {
      console.log(`⛔ Skipped non-Tamil movie: ${cleanTitle}`);
      return null;
    }

    return {
      year: data.Year || null,
      genre: data.Genre || null,
      description: data.Plot !== "N/A" ? data.Plot : null,
      posterUrl: data.Poster !== "N/A" ? data.Poster : null,
      director: data.Director !== "N/A" ? data.Director : null,
      actors: data.Actors !== "N/A" ? data.Actors : null,
      imdbRating: data.imdbRating !== "N/A" ? data.imdbRating : null,
      language: data.Language || null,
    };
  } catch (err) {
    console.error("❌ OMDb fetch failed:", err.message);
    return null;
  }
};

module.exports = fetchMovieFromOMDb;
