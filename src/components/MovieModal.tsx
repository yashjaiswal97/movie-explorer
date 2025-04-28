import React from 'react';
import './MovieModal.css';

interface MovieModalProps {
  movie: any;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="modal-poster"
        />
        <div className="modal-info">
          <h2>{movie.title || movie.name}</h2>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p>{movie.overview}</p>
        </div>
        <button className="close-button" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default MovieModal;