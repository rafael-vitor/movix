import React from 'react';
import './styles.css';

function Header() {
  return (
    <div className="Header">
      <h1>Movies. Listed.</h1>
      <input className="Header-input" placeholder="search for a movie"  id="movie-input" ></input>
    </div>
  );
}

export default Header;
