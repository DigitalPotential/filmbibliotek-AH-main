import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// här skapar jag min fetch med async thunk
export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async (page = 1) => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=77812762&s=movie&type=movie&page=${page}`
    );
    const data = await response.json();
    if (data.Response === "True") {
      console.log("Fetched movies:", data.Search);
      return {
        movies: data.Search,
        totalResults: parseInt(data.totalResults, 10)
      };
    } else {
      throw new Error(data.Error);
    }
  }
);

// skapar en slice för att hantera tillstånd och reducers som ska skickas till store
const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalResults: 0,
  },

  reducers: {
    incrementPage: (state) => {
      state.currentPage += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = [...state.movies, ...action.payload.movies];
        state.totalResults = action.payload.totalResults;
        console.log("Updated movies state:", state.movies);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { incrementPage } = movieSlice.actions;
export default movieSlice.reducer;
