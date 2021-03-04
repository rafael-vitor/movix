import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { AiOutlineFire, AiOutlineSearch } from "react-icons/ai";

import MovieList from "./components/MovieList";
import Header from "./components/Header";

import { API_KEY, BASE_URL } from "./constants";
import { MoviesDataType } from "./types";

const discoverPath = `/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const searchPath = `/search/movie?api_key=${API_KEY}`;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasError, setHasError] = useState(false);
  const [moviesData, setMoviesData] = useState<MoviesDataType | undefined>();

  const fetchDiscoverMovies = async () => {
    try {
      const response = await fetch(`${BASE_URL}${discoverPath}`);

      if (response.status === 200) {
        const data = await response.json();

        setMoviesData(data);
      } else {
        console.log("unexpected response code");
        const data = await response.json();

        throw data.status_message;
      }
    } catch (e) {
      console.error(e);
      setHasError(true);
    }
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
      {!hasError && !!moviesData ? (
        <MovieList
          listTitle={searchQuery ? searchQuery : "Discover"}
          icon={
            searchQuery ? (
              <AiOutlineSearch color="red" />
            ) : (
              <AiOutlineFire color="red" />
            )
          }
          data={moviesData}
        />
      ) : (
        <h3>{hasError ? "Something went wrong" : "loading..."}</h3>
      )}
    </div>
  );
}

export default App;
