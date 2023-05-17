import React from "react";
import styles from "./MovieListHeader.module.css";

const MovieListHeader = () => {
  return (
    <div className={styles.listHeader}>
      <img src="Slices/nav_bar.png" alt="" />
      <div className={styles.navBar}>
        <p>
          <img src="/Slices/Back.png" alt="" width="18px" height="auto" />
          <span>Romantic Comedy</span>
        </p>

        <img src="/Slices/search.png" alt="" width="18px" height="18px" />
      </div>
    </div>
  );
};

export default MovieListHeader;
