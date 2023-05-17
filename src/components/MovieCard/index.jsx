import React from "react";
import styles from "./MovieCard.module.css";

const MovieCard = ({ movieData }) => {
  const download_url = movieData["poster-image"];
  const name = movieData.name;
  return (
    <div>
      <img
        alt={name}
        width="85px"
        height="127px"
        data-src={download_url}
        onError={(e) => {
          e.currentTarget.src = "/Slices/placeholder_for_missing_posters.png";
        }}
        src="/Slices/placeholder_for_missing_posters.png"
      />
      <div className={styles.cardFooter}>{name}</div>
    </div>
  );
};

export default MovieCard;
