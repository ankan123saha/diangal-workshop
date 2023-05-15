import logo from "./logo.svg";
import "./App.css";
import store from "./redux-saga/store";
import { Provider } from "react-redux";

import MovieListContainer from "./components/MovieListContainer";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MovieListContainer />
      </div>
    </Provider>
  );
}

export default App;
