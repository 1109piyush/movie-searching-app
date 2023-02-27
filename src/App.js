import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchRandomMovies = async () => {
    const response = await axios.get(`http://www.omdbapi.com/?s=random&apikey=263d22d8`);
    setMovies(response.data.Search);
  };

  useEffect(() => {
    fetchRandomMovies();
  }, []);

  const searchMovies = async (event) => {
    event.preventDefault();
    const response = await axios.get(`http://www.omdbapi.com/?s=${searchQuery}&apikey=263d22d8`);
    setMovies(response.data.Search);
  };

  const getMovieDetails = async (imdbID) => {
    const response = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=263d22d8`);
    setSelectedMovie(response.data);
  };

  const goHome = () => {
    setSelectedMovie(null);
    setSearchQuery('');
    fetchRandomMovies();
  };

  return (
    <div className="App">
      <header>
        <h1 onClick={goHome}>Movies</h1>
      </header>
      {selectedMovie ? (
        <div className="selected-movie-container">
          <div className="selected-movie-details">
            <h2>{selectedMovie.Title}</h2>
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
            <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
            <p><strong>Released:</strong> {selectedMovie.Released}</p>
            <p><strong>Runtime:</strong> {selectedMovie.Runtime}</p>
            <p><strong>Director:</strong> {selectedMovie.Director}</p>
            <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
            <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={searchMovies}>
            <input type="text" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search for movies" />
            <button type="submit">Search</button>
          </form>
          <div className="movie-list">
            {movies.map((movie) => (
              <div className="movie-item" key={movie.imdbID} onClick={() => getMovieDetails(movie.imdbID)}>
                <img src={movie.Poster} alt={movie.Title} />
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
