import React, { useState, useEffect } from 'react';

import MovieCard from './MovieCard';
import SearchIcon from './search.svg';
import './App.css';

const API_URL = 'https://www.omdbapi.com?apikey=38867bba'

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [lastSearchTerm, setLastSearchTerm] = useState('');

    const searchCurrentTerm = () => {
      searchMovies(searchTerm);
    }

    useEffect(() => {
      searchCurrentTerm('');
    }, []);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
        setLastSearchTerm(title);
    }

    return (
      <div className="app">
        <h1>MirFlix</h1>

        <div className="search">
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
             } }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchTerm(e.target.value)
                searchCurrentTerm();
              }
             } }
            placeholder="Search for a movie..."
          />
          <img
            src={SearchIcon}
            alt="Search"
            onClick={() => searchCurrentTerm()}
          />
        </div>

        {
          movies?.length > 0 ? (
            <div className="container">
              {
                movies.map(movie => (
                  <MovieCard movie={movie} />
                ))
              }
            </div>
          ) : (
            lastSearchTerm !== '' ? (
              <div className="empty">
                <h2><em>{lastSearchTerm}</em> not found.</h2>
              </div>
            ) : null
          )
        }
      </div>
    );
}

export default App;