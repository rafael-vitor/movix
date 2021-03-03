import React from "react";
import "./styles.css";

import { DiscoverDataType } from "../../types";

type Props = {
  listTitle: string;
  data: DiscoverDataType;
  icon: React.ReactNode;
};

function MovieList({ listTitle, data, icon }: Props) {
  return (
    <div className="MovieList">
      <div className="MovieList-title">
        {icon} {listTitle}
      </div>
      <div className="MovieList-list">
        {data?.results.map((m) => (
          <div className="MovieList-item" key={m.id}>
            <div className="MovieList-item-overlay">
              <p>{m.original_title}</p>
              <p>{m.release_date.split("-")[0]}</p>
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
