import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  popularMovies: [],
  topRatedMovies: [],
  upcoming: [],
  single: null, 
  cast: null,  
  searchResults: [],
  status: "idle",
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data.results;
});

export const fetchTopRatedMovies = createAsyncThunk("movies/fetchTopRatedMovies", async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch top-rated movies");
  }
  const data = await response.json();
  return data.results;
});

export const upComingMovies = createAsyncThunk("movies/upComingMovies", async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch upcoming movies");
  }
  const data = await response.json();
  return data.results;
});

export const singleMovies = createAsyncThunk("movies/singleMovies", async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch single movie");
  }
  const data = await response.json();
  return data;
});

export const castDetails = createAsyncThunk("movies/castDetails", async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch cast details");
  }
  const data = await response.json();
  return data;
});

export const searchMovies = createAsyncThunk("movies/searchMovies", async (query) => {
  if (!query) {  // Handle empty query
    return []; // Return empty array to clear search results
  }
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${query}&page=1`
  );
  if (!response.ok) {
    throw new Error("Failed to search movies");
  }
  const data = await response.json();
  return data.results;
});


export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popularMovies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topRatedMovies = action.payload;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(upComingMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(upComingMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.upcoming = action.payload;
      })
      .addCase(upComingMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(singleMovies.pending, (state) => {
        state.status = "loading";
        state.single = null;
      })
      .addCase(singleMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.single = action.payload;
      })
      .addCase(singleMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.single = null;
      })
      .addCase(castDetails.pending, (state) => {
        state.status = "loading";
        state.cast = null;
      })
      .addCase(castDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cast = action.payload;
      })
      .addCase(castDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.cast = null;
      })
      .addCase(searchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearSearchResults } = movieSlice.actions;
export default movieSlice.reducer;