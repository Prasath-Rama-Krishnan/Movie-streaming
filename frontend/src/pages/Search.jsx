import Navbar from "../Components/Navbar";
import getMovieData from "../Data/Data";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();

  const { allMovies } = getMovieData(); 

  const results = query
    ? allMovies.filter((movie) =>
        movie.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="landing-page">
      <Navbar />
      <main className="content">
        <div className="content__section">
          <header className="content__section-header">
            <h2>
              {query ? `Search results for "${query}"` : "Search for a movie"}
            </h2>
          </header>

          {query && results.length === 0 && (
            <p>No movies found matching your search.</p>
          )}

          {results.length > 0 && (
            <div className="content__carousel">
              {results.map((movie) => (
                <article key={movie.name} className="content__card">
                  <h3>{movie.name}</h3>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Search;


