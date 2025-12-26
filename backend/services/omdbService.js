const axios = require("axios");

const fetchMovieFromOMDb = async (title) => {
  try {
    // Normalize title (Cloudinary filenames → real titles)
    const cleanTitle = title
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const res = await axios.get("https://www.omdbapi.com/", {
      params: {
        t: cleanTitle,
        apikey: process.env.OMDB_API_KEY,
        r: "json",
        type: "movie",
      },
      timeout: 5000,
    });

    const data = res.data;

    // ❌ Not found
    if (data.Response === "False") {
      console.log(`❌ OMDb not found: ${cleanTitle}`);
      return null;
    }

    // ❌ Skip Hollywood (Non-Tamil) movies
    // OMDb returns "Tamil, Hindi, English" etc.
    if (
      data.Language &&
      !data.Language.toLowerCase().includes("tamil")
    ) {
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
      country: data.Country || null,
    };
  } catch (err) {
    console.error("❌ OMDb fetch failed:", err.message);
    return null;
  }
};

module.exports = fetchMovieFromOMDb;
