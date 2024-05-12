import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai'; // A search icon from react-icons library
import './MovieApp.css'; // CSS styles for our Movie App

const MovieRecommendations = () => {
  // Defining several state variables to keep track of different things
  const [movies, setMovies] = useState([]); // To store movie data
  const [searchQuery, setSearchQuery] = useState(''); // For user's search input
  //This line of code is creating a state variable named searchQuery and a function named setSearchQuery to update it. The initial value of searchQuery is set to an empty string ''. This state variable is typically used to store the input value of a search field in a React component, allowing the component to react to changes in the search query entered by the user.
  const [sortBy, setSortBy] = useState('popularity.desc'); // To sort movies by different criteria
  const [genres, setGenres] = useState([]); // To store genre data
  const [selectedGenre, setSelectedGenre] = useState(''); // For filtering movies by genre
  const [expandedMovieId, setExpandedMovieId] = useState(null); // To track if a movie's description is expanded or not

  // This useEffect hook fetches the list of genres when the component mounts
  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(
        'https://api.themoviedb.org/3/genre/movie/list', // API endpoint to get movie genres
        {
          params: {
            api_key: '0fa2853e7c4d6c8f146aba861c5e4a06', // API key for authentication
          },
        }
      );
      setGenres(response.data.genres); // Updating genres state with fetched data
    };
    fetchGenres();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // This useEffect hook fetches movies based on search query, sort criteria, and selected genre
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        'https://api.themoviedb.org/3/discover/movie', // API endpoint to discover movies
        {
          params: {
            api_key: 'eee1b4aca2066defac40f517647aa5a2', // API key for authentication
            sort_by: sortBy,
            page: 1,
            with_genres: selectedGenre,
            query: searchQuery,
          },
        }
      );
      setMovies(response.data.results); // Updating movies state with fetched data
    };
    fetchMovies();
  }, [searchQuery, sortBy, selectedGenre]); // Runs whenever searchQuery, sortBy, or selectedGenre changes

  // Function to handle changes in search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle changes in sort criteria
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Function to handle changes in selected genre
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  // Function to handle search submission
  const handleSearchSubmit = async () => {
    const response = await axios.get(
      'https://api.themoviedb.org/3/search/movie', // API endpoint to search for movies
      {
        params: {
          api_key: 'eee1b4aca2066defac40f517647aa5a2', // API key for authentication
          query: searchQuery,
        },
      }
    );
    setMovies(response.data.results); // Updating movies state with search results
    console.log(response.data.results);
  };

  // Function to toggle the display of movie description
  const toggleDescription = (movieId) => {
    setExpandedMovieId(expandedMovieId === movieId ? null : movieId);
  };

  // Rendering JSX
  return (
    <div>
      <h1>MovieHunter</h1> {/* Title */}
      <div className="search-bar">
        {/* Search input and button */}
        <input type="text" placeholder="Search Movies Here" value={searchQuery} onChange={handleSearchChange} className='search-input'/>
        <button onClick={handleSearchSubmit} className="search-button">
          <AiOutlineSearch /> {/* Search icon */}
        </button>
      </div>
      {/* Filter options */}
      <div className="filters">
        <label htmlFor="sort-by">Sort By:</label>
        {/* Dropdown to select sort criteria */}
        <select id="sort-by" value={sortBy} onChange={handleSortChange}>
          <option value="popularity.desc">Popularity Descending</option>
          <option value="popularity.asc">Popularity Ascending</option>
          <option value="vote_average.desc">Rating Descending</option>
          <option value="vote_average.asc">Rating Ascending</option>
          <option value="release_date.desc">Release Date Descending</option>
          <option value="release_date.asc">Release Date Ascending</option>
        </select>
        <label htmlFor="genre">Genre:</label>
        {/* Dropdown to select genre */}
        <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {/* Mapping through genres to display options */}
          {genres.map((genre) => (//go through each item in genre list
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      {/* Displaying movies */}
      <div className="movie-wrapper">
        {/* Mapping through movies to display each one */}
        {movies.map((movie) => (
          <div key={movie.id} className="movie">
            {/* Movie poster */}
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h2>{movie.title}</h2> {/* Movie title */}
            <p className='rating'>Rating: {movie.vote_average}</p> {/* Movie rating */}
            {/* Displaying movie description*/}
            {expandedMovieId === movie.id ? (
              <p>{movie.overview}</p>
            ) : (
              <p>{movie.overview.substring(0, 40)}...</p>
            )}
            {/* Button to toggle description visibility */}
            <button onClick={() => toggleDescription(movie.id)} className='read-more'>
              {expandedMovieId === movie.id ? 'Show Less' : 'Read More'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendations; // Exporting the component
