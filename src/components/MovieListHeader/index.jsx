import React, { useEffect, useState } from "react";
import styles from "./MovieListHeader.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchResult,
  setSearchString,
} from "../../redux-saga/redux/movieList";

const MovieListHeader = () => {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showSearchIcon, setSearchIcon] = useState(true);
  const { movieList, searchString } = useSelector((state) => state);

  const dispatch = useDispatch();
  const handleSearch = (e) => {
    dispatch(setSearchString(e.target.value));
  };

  useEffect(() => {
    if (searchString.length > 2 && movieList.length > 0) {
      const result = movieList.filter((ele: any) =>
        ele.name.toUpperCase().match(searchString.toUpperCase())
      );
      dispatch(setSearchResult(result));
    }
  }, [searchString, movieList]);

  return (
    <div className={styles.listHeader}>
      <img src="./Slices/nav_bar.png" alt="" />
      <div className={styles.navBar}>
        <p>
          {showSearchIcon && (
            <img
              src="./Slices/Back.png"
              alt=""
              width="18px"
              height="auto"
              onClick={() => {
                setSearchIcon(false);
                setShowSearchBox(false);
                dispatch(setSearchString(""));
              }}
            />
          )}
          <span onClick={() => setSearchIcon(true)}>Romantic Comedy</span>
        </p>
        {showSearchIcon && (
          <>
            {showSearchBox ? (
              <img
                src="./Slices/close.png"
                onClick={() => {
                  setShowSearchBox(false)
                  dispatch(setSearchString(""));

                }}
                alt=""
                width="18px"
                height="18px"
              />
            ) : (
              <img
                src="./Slices/search.png"
                onClick={() => setShowSearchBox(true)}
                alt=""
                width="18px"
                height="18px"
              />
            )}
          </>
        )}
      </div>
      {showSearchIcon && (
        <div
          className={`${styles.searchInput} ${
            !showSearchBox ? styles.searchInputInitial : ""
          }`}
        >
          <input
            type="text"
            autoFocus={true}
            placeholder="Type here to search..."
            onChange={handleSearch}
            minlength="2"
            maxlength="10"
          />
          <small></small>
        </div>
      )}
    </div>
  );
};

export default MovieListHeader;
