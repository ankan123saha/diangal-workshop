import { put, takeLatest } from "redux-saga/effects";
import {
  fetchMovieListStart,
  fetchMovieListSuccess,
  fetchMovieListFailure,
} from "../redux/movieList";
import { fetchMovieList } from "../../services/movieList";

function* movieListWatcher() {
  yield takeLatest(fetchMovieListStart.type, fetchMovieListWorker);
}

function* fetchMovieListWorker(action) {
  try {
    const result = yield fetchMovieList(action.payload);

    console.log(result, 'resultresultresultresultresult')
    const formattedResult = {
      movieList: result["content-items"].content,
      metaData: {
        currentPage: result["page-num-requested"],
        perPage: result["page-size-requested"],
        total: result["total-content-items"],
      },
    };
    yield put(fetchMovieListSuccess(formattedResult));
  } catch (e) {
    yield put(fetchMovieListFailure(e.message));
  }
}

export default movieListWatcher;
