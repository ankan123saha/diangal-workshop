import { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchMovieListStart,
  advancePager,
} from "../../redux-saga/redux/movieList";
import styles from "./MovieListContainer.module.css";

function MovieListContainer() {
  const [hasMore, setHasMore] = useState(true);
  const { movieList, pager } = useSelector((state) => state);
  const dispatch = useDispatch();

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
            currentImg.src = `/Slices/${newImgSrc}`;
          }
          intObs.unobserve(node); // detach the observer when done
        }
      });
    });
    intObs.observe(node);
  }, []);

  useEffect(() => {
    imagesRef.current = document.querySelectorAll(".card-img-top");

    if (imagesRef.current) {
      imagesRef.current.forEach((img) => imgObserver(img));
    }
  }, [imgObserver, imagesRef, movieList]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.listHeader}>
        <div>
          <img src="/Slices/Back.png" alt="" width="15px" height="auto" />
          <span>Romantic Comedy</span>
        </div>

        <img src="/Slices/search.png" alt="" width="15px" height="15px" />
      </div>{" "}
      <InfiniteScroll
        dataLength={movieList.length}
        className={styles.gridContainer}
        next={handleMoviesLoader}
        hasMore={pager?.page < 3}
      >
        {movieList.map((movie, index) => {
          const download_url = movie["poster-image"];
          const name = movie.name;
          return (
            <div key={index} className="card">
              <img
                alt={name}
                width="91px"
                height="136px"
                data-src={download_url}
                onError={(e) => {
                  e.currentTarget.src =
                    "/Slices/placeholder_for_missing_posters.png";
                }}
                className="card-img-top"
                src="/Slices/placeholder_for_missing_posters.png"
              />
              <div className={styles.cardFooter}>{name}</div>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

export default MovieListContainer;
