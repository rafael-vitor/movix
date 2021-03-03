import React from "react";
import "./styles.css";

type Props = {
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Header({ onChangeInput }: Props) {
  return (
    <div className="Header">
      <h1>Movies. Listed.</h1>
      <input
        onChange={onChangeInput}
        className="Header-input"
        placeholder="search for a movie"
        id="movie-input"
      ></input>
    </div>
  );
}

export default Header;
