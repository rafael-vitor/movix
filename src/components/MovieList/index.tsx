import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import MovieView, { MovieProps } from "../MovieView";
import { DiscoverDataType } from "../../types";
import "./styles.css";

type Props = {
  listTitle: string;
  data: DiscoverDataType;
  icon: React.ReactNode;
};

function MovieList({ listTitle, data, icon }: Props) {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieProps | null>();

  const onChangeRating = (rating: number) => {
    if (filterActive && selectedRating === rating) {
      setFilterActive(false);
      setSelectedRating(0);
    } else {
      setFilterActive(true);
      setSelectedRating(rating);
    }
  };

  const movies = filterActive
    ? data?.results.filter(
        (m) =>
          m.vote_average / 2 >= selectedRating - 1 &&
          m.vote_average / 2 < selectedRating
      )
    : data?.results;

  return (
    <div className="MovieList">
      {!!selectedMovie && (
        <MovieView {...selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
      <div className="MovieList-header">
        {icon} {listTitle}
        <div className="MovieList-rating">
          {[...Array(5).keys()].map((_, idx) => {
            const Icon =
              selectedRating <= idx || !filterActive
                ? AiOutlineStar
                : AiFillStar;
            return (
              <Icon
                onClick={() => onChangeRating(idx + 1)}
                key={idx}
                color={filterActive ? "red" : "lightgrey"}
                size="20px"
              />
            );
          })}
        </div>
      </div>
      <div className="MovieList-list">
        {movies.map((m) => (
          <div
            className="MovieList-item"
            key={m.id}
            onClick={() => setSelectedMovie(m)}
          >
            <div className="MovieList-item-overlay">
              <p>{m.original_title}</p>
              <p>{m.release_date?.split("-")[0]}</p>
            </div>
            {m.poster_path ? (
              <img
                className="MovieList-item-image"
                src={`https://image.tmdb.org/t/p/w200/${m.poster_path}`}
                alt="movie poster"
              />
            ) : (
              <div className="MovieList-poster-fallback">
                <p>{m.original_title}</p>
                <p>{m.release_date.split("-")[0]}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
