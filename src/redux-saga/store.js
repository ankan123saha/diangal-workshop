import {
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import reducer from "./redux/movieList";
import fetchMovieListWorker from "./saga/movieList";

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
  sagaMiddleware,
];


const store = configureStore({
  reducer,
  middleware,
});

sagaMiddleware.run(fetchMovieListWorker);

export default store;
