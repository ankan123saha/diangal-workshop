import { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchMovieListStart,
  advancePager,
} from "../../redux-saga/redux/movieList";
import styles from "./MovieListContainer.module.css";
import MovieCard from "../MovieCard";
import MovieListHeader from "../MovieListHeader";

function MovieListContainer() {
  const [hasMore, setHasMore] = useState(true);
  const { movieList, pager, searchResult, searchString } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const listItems = searchString.length > 1 ? searchResult : movieList;
  useEffect(() => {
    dispatch(fetchMovieListStart(pager?.page));
  }, [pager?.page]);

  const handleMoviesLoader = () => {
    dispatch(advancePager());
  };

  const imagesRef = useRef(null);

  const imgObserver = useCallback((node) => {
    const intObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.intersectionRatio > 0) {
          const currentImg = en.target;
          const newImgSrc = currentImg.dataset.src;

          // only swap out the image source if the new url exists
          if (!newImgSrc) {
            console.error("Image source is invalid");
          } else {
            currentImg.src = `./Slices/${newImgSrc}`;
          }
          intObs.unobserve(node); // detach the observer when done
        }
      });
    });
    intObs.observe(node);
  }, []);

  useEffect(() => {
    imagesRef.current = document.querySelectorAll(".card-img");

    if (imagesRef.current) {
      imagesRef.current.forEach((img) => imgObserver(img));
    }
  }, [imgObserver, imagesRef, listItems]);

  return (
    <div className={styles.pageContainer}>
      <MovieListHeader />
      <InfiniteScroll
        dataLength={listItems.length}
        className={styles.gridContainer}
        next={handleMoviesLoader}
        hasMore={pager?.page < 3}
      >
        {listItems.map((movie, index) => (
          <MovieCard key={index} movieData={movie} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default MovieListContainer;
