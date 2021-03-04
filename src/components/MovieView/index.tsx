import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import "./styles.css";

export type MovieProps = {
  title: string;
  release_date: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
};

type Props = {
  onClose: () => void;
} & MovieProps;

function MovieView({
  title,
  overview,
  backdrop_path,
  onClose,
  release_date,
  vote_average,
}: Props) {
  return (
    <Modal open={true} center onClose={onClose}>
      <div className="MovieView">
        <h2>{title}</h2>
        {backdrop_path && (
          <img
            className="MovieList-item-image"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="movie poster"
          />
        )}
        <div className="MovieView-details">
          <span>{release_date}</span>
          <span>{vote_average}</span>
        </div>
        <p>{overview}</p>
      </div>
    </Modal>
  );
}

export default MovieView;
