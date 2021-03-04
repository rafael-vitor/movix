import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { AiOutlineFire, AiOutlineSearch } from "react-icons/ai";

import MovieList from "./components/MovieList";

import { API_KEY, BASE_URL } from "./constants";
import { MoviesDataType } from "./types";
import "./App.css";
import Header from "./components/Header";

const discoverPath = `/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const searchPath = `/search/movie?api_key=${API_KEY}`;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [moviesData, setMoviesData] = useState<DiscoverDataType | undefined>();

  const fetchDiscoverMovies = async () => {
    const response = await fetch(`${BASE_URL}${discoverPath}`);
    const data = await response.json();

    setMoviesData(data);
  };

  useEffect(() => {
    fetchDiscoverMovies();
  }, []);

  const searchMovies = async (query: string) => {
    if (query) {
      const response = await fetch(`${BASE_URL}${searchPath}&query=${query}`);
      const data = await response.json();

      setMoviesData(data);
    } else {
      fetchDiscoverMovies();
    }
  };

  const debouncedSave = useCallback(
    debounce((nextValue: string) => searchMovies(nextValue), 1000),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debouncedSave(e.target.value);
  };

  return (
    <div className="App">
      <Header onChangeInput={onChangeInput} />
      {moviesData !== undefined ? (
        <MovieList
          listTitle={searchQuery ? searchQuery : "Discover"}
          icon={searchQuery ? <AiOutlineSearch color="red" /> : <AiOutlineFire color="red" />}
          data={moviesData}
        />
      ) : (
        <h3>loading...</h3>
      )}
    </div>
  );
}

export default App;
