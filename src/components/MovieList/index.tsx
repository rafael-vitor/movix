import React from "react";
import "./styles.css";

import { AiOutlineFire } from "react-icons/ai";
import { DiscoverDataType } from "../../types";

type Props = {
  listTitle: string;
  data: DiscoverDataType;
};

function MovieList({ listTitle, data }: Props) {
  return (
    <div className="MovieList">
      <div className="MovieList-title">
        <AiOutlineFire /> {listTitle}
        </div>
        <div className="MovieList-list">
          {data?.results.map((m) => (
            <div className="MovieList-item" key={m.original_title}>
              <div className="MovieList-item-overlay">
                <p>{m.original_title}</p>
                <p>{m.release_date.split('-')[0]}</p>
              </div>
              <img
                src={`https://image.tmdb.org/t/p/w200/${m.poster_path}`}
              ></img>
            </div>
          ))}
        </div>
      </div>
  );
}

export default MovieList;
