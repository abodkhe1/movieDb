import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../reducer/moviereducer";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export default store;
