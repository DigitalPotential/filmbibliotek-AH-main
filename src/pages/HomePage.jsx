// src/pages/HomePage.jsx
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

const HomePage = () => {
  return (
    <div>
      <h1>Home nigth</h1>
      <SearchBar />
      <MovieList />
    </div>
  );
};

export default HomePage;
