import React, { useEffect, useState } from "react";
import Row from '../components/Row/Row';
import MovieCard from '../components/MovieCard/MovieCard';
import './home.css';
import TrendingSlider from '../components/TrendingSlider/TrendingSlider';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [topRatedTVShows, setTopRatedTVShows] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchUpcomingMovies();
    fetchPopularTVShows();
    fetchTopRatedTVShows();
    fetchActionMovies();
    fetchComedyMovies();
  }, []);

  const fetchPopularMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    );
    const data = await res.json();
    setPopularMovies(data.results);
  };

  const fetchTopRatedMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    );
    const data = await res.json();
    setTopRatedMovies(data.results);
  };

  const fetchUpcomingMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    );
    const data = await res.json();
    setUpcomingMovies(data.results);
  };

  const fetchPopularTVShows = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    );
    const data = await res.json();
    setPopularTVShows(data.results);
  };

  const fetchTopRatedTVShows = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    );
    const data = await res.json();
    setTopRatedTVShows(data.results);
  };

  const fetchActionMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=28`
    );
    const data = await res.json();
    setActionMovies(data.results);
  };

  const fetchComedyMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=35`
    );
    const data = await res.json();
    setComedyMovies(data.results);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim() === '') {
      setSearchResults([]);
    }
  };

  return (
    <div className="home">
      <TrendingSlider />
      <div className="top-menu">
        <span className="menu-item">Movies</span>
        <span className="menu-item">TV Shows</span>
        <span className="menu-item">Genres</span>
      </div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for movies or TV shows..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {searchResults.length > 0 ? (
        <div className="search-results">
          <h2 className="row-title">Search Results</h2>
          <div className="row-cards">
            {searchResults.map((item: any) => (
              <MovieCard
                key={item.id}
                title={item.title || item.name}
                posterPath={item.poster_path}
                rating={item.vote_average}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Movie Rows */}
          <Row title="Popular Movies" movies={popularMovies} />
          <Row title="Top Rated Movies" movies={topRatedMovies} />
          <Row title="Upcoming Movies" movies={upcomingMovies} />

          {/* TV Show Rows */}
          <Row title="Popular TV Shows" movies={popularTVShows} />
          <Row title="Top Rated TV Shows" movies={topRatedTVShows} />

          {/* Genre Rows */}
          <Row title="Action Movies" movies={actionMovies} />
          <Row title="Comedy Movies" movies={comedyMovies} />
        </>
      )}
    </div>
  );
};

export default Home;