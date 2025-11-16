import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Header from "../pages/Header";
import { getTmdbPosterUrl } from '../utils/tmdb'; // adjust if 'utils' is not in src


function MovieCard({ movie, onRate }) {
  const [poster, setPoster] = useState(movie.poster_url || null);
  useEffect(() => {
    if (!poster && movie.tmdbId) {
      getTmdbPosterUrl(movie.tmdbId).then(setPoster);
    }
  }, [movie.tmdbId, poster]);
  return (
    <div className="movie-card">
      <img
        src={poster || "https://via.placeholder.com/150?text=No+Image"}
        alt={movie.title}
      />
      <h4>{movie.title}</h4>
      <div>{movie.genres}</div>
      <button onClick={onRate}>Rate Now</button>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_FLASK_API_URL}/api/movies`)
      .then(res => res.json())
      .then(data => {
        setMovies(data);
      })
      .catch(err => console.error("Failed to fetch movies", err));
  }, []);


  const handleRateClick = (movie) => {
    // Navigate to /rate, passing selected movie via state
    localStorage.setItem("immediateRateMovieIds", JSON.stringify([movie.movieId]));
    navigate('/rate', { state: { selectedMovie: movie } });
  };

  return (
    <div className="homepage-root">
      <Header />
      <section className="hero">
        <h1>Welcome to <br />RecommendMovie</h1>
        <p>Discover movies you'll love. Rate a few to get started!</p>
        <button onClick={() => navigate('/rate')}>Start Rating Now</button>
      </section>
      <section>
        <h2><span className="highlight">Featured</span> Movies</h2>
        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard
              key={movie.movieId}
              movie={movie}
              onRate={() => handleRateClick(movie)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
