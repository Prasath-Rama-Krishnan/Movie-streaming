import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../Landing";
import MoviePage from "../pages/MoviePage";
import Search from "../pages/Search";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/landing" element={<Landing />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/search" element={<Search />} />

        {/* Auth pages */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
