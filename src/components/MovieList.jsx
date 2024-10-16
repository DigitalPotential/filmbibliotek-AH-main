import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, incrementPage } from "../features/movieSlice";
import "./MovieList.css";

function MovieList() {
  const dispatch = useDispatch();
  const moviesState = useSelector((state) => state.movies);
  const { movies, loading, error, currentPage, totalResults } = moviesState || {
    movies: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalResults: 0,
  };

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(fetchMovies(currentPage));
    }
  }, [dispatch, currentPage, movies.length]);

  const loadMore = () => {
    if (movies.length < totalResults) {
      dispatch(incrementPage());
      dispatch(fetchMovies(currentPage + 1));
    }
  };

  console.log("MovieList state:", {
    moviesState,
    movies,
    loading,
    error,
    currentPage,
    totalResults,
  });

  if (loading && movies.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>MovieList</h1>
      {movies && movies.length > 0 ? (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="movie-card">
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
                <img src={movie.Poster} alt={movie.Title} />
              </div>
            ))}
          </div>
          {movies.length < totalResults && (
            <button onClick={loadMore} disabled={loading}>
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </>
      ) : (
        <div>No movies found</div>
      )}
    </div>
  );
}

export default MovieList;
