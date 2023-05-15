import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieList: [],
  metaData: null,
  pager: { page: 1 },
};

const {
  actions: {
    fetchMovieListStart,
    fetchMovieListSuccess,
    fetchMovieListFailure,
    advancePager
  },
  reducer,
} = createSlice({
  name: "betHistory",
  initialState,
  reducers: {
    fetchMovieListStart: (state, action) => ({
      ...state,
      loading: true,
    }),
    fetchMovieListSuccess: (state, action) => {
      return {
        ...state,
        movieList: [...action.payload.movieList, ...state.movieList],
        metaData: action.payload.metaData,
        error: null,
        loading: false,
      };
    },
    fetchMovieListFailure: (state, action) => ({
      ...state,
      error: action.payload,
      movieList: [],
      loading: false,
    }),
    advancePager: (state, action) => ({
      ...state,
      pager: { page: state.pager.page + 1 },
    }),
  },
});

export default reducer;
export { fetchMovieListStart, fetchMovieListSuccess, fetchMovieListFailure, advancePager };
