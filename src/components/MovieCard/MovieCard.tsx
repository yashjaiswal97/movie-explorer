import React from 'react';
import './MovieCard.css';

interface MovieCardProps {
  title: string;
  posterPath: string;
  rating: number;
  genres?: string[]; // <-- New addition
  onClick?: () => void; // <-- For popup
}

const MovieCard: React.FC<MovieCardProps> = ({ title, posterPath, rating, genres, onClick }) => {
  return (
    <div className="movie-card" onClick={onClick}>
      <img
        src={`https://image.tmdb.org/t/p/w300${posterPath}`}
        alt={title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3>{title}</h3>
        <p>⭐ {rating}</p>
        <div className="genres">
          {genres?.map((genre) => (
            <span key={genre} className="genre-tag">{genre}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;