import React, { useState, useEffect } from 'react';

import MovieList from './components/MovieList';

import { BASE_URL } from './constants';
import { DiscoverDataType } from './types';
import './App.css';

const discoverPath = '/discover/movie?sort_by=popularity.desc&api_key=545ac8664390a4e656692ed8f6f2528e'


function App() {
  const [discoverMoviesData, setDiscoverMoviesData] = useState<DiscoverDataType | undefined>();

  const fetchDiscoverMovies = async () => {
    console.log('fetching movies');

    const response = await fetch(`${BASE_URL}${discoverPath}`);
    const data = await response.json();
    console.log({ data });

    setDiscoverMoviesData(data);
  }

  useEffect(() => {
    fetchDiscoverMovies();
  }, [])

  return (
    <div className="App">
      {discoverMoviesData !== undefined ? (
        <MovieList listTitle="Discover" data={discoverMoviesData} />
      ) : (
        <h3>loading...</h3>
      )
      }
    </div>
  );
}

export default App;
