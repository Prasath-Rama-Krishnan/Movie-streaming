import { useEffect, useState } from "react";
import "./Profile.css";
import MovieCard from "../Components/MovieCard";
import { getProfile, getWatchLater, removeWatchLater } from "../api/userApi";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [watchLater, setWatchLater] = useState([]);

  useEffect(() => {
    const load = async () => {
      const profileRes = await getProfile();
      const watchLaterRes = await getWatchLater();
      setUser(profileRes.data);
      setWatchLater(watchLaterRes.data);
    };
    load();
  }, []);

  const handleRemove = async (movieId) => {
    await removeWatchLater(movieId);
    setWatchLater((prev) => prev.filter((m) => m._id !== movieId));
  };

  if (!user) return <h2 style={{ color: "white" }}>Loading...</h2>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>👤 {user.name}</h2>
        <p>{user.email}</p>
      </div>

      <h3 className="watchlater-title">🎞️ Watch Later</h3>

      {watchLater.length === 0 ? (
        <p className="watchlater-empty">No movies added yet.</p>
      ) : (
        <div className="watchlater-grid">
          {watchLater.map((movie) => (
            <div key={movie._id} className="watchlater-item">
              <MovieCard movie={movie} />

              {/* ❌ REMOVE BUTTON */}
              <button
                className="remove-btn"
                onClick={() => handleRemove(movie._id)}
              >
                ✕ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
