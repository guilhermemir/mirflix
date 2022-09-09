import React, { useState, useEffect } from 'react';

import MovieCard from './MovieCard';
import SearchIcon from './search.svg';
import './App.css';

const API_URL = 'https://www.omdbapi.com?apikey=38867bba'

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      searchCurrentTerm();
    }, []);

    const searchCurrentTerm = () => {
      searchMovies(searchTerm);
    }

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
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
            placeholder="Busque por um filme..."
          />
          <img
            src={SearchIcon}
            alt="Buscar"
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
            searchTerm === '' ? (
              <div className="empty">
                <h2>Procure por um filme :)</h2>
              </div>
            ) : (
              <div className="empty">
                <h2>Nenhum filme encontrado chamado <em>{searchTerm}</em>.</h2>
              </div>
            )
          )
        }
      </div>
    );
}

export default App;