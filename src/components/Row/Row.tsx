import React, { useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import MovieModal from '../MovieModal'; 

import './Row.css';

interface RowProps {
  title: string;
  movies: any[];
}

const Row: React.FC<RowProps> = ({ title, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  const handleCardClick = (movie: any) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      <div className="row-cards">
        {movies.map((movie: any) => (
          <MovieCard
            key={movie.id}
            title={movie.title || movie.name}
            posterPath={movie.poster_path}
            rating={movie.vote_average}
            onClick={() => handleCardClick(movie)}
          />
        ))}
      </div>

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
    </div>
  );
};

export default Row;