import React, { useState, useEffect } from "react";
import "./RatingsPage.css";
import Header from "../pages/Header";
import { getTmdbPosterUrl } from "../utils/tmdb";

export default function RatingsPage() {
  const [allMovies, setAllMovies] = useState([]);
  const [ratedMovieIds, setRatedMovieIds] = useState(() =>
    JSON.parse(localStorage.getItem("ratedMovieIds") || "[]")
  );
  const [immediateRateMovieIds, setImmediateRateMovieIds] = useState(() =>
    JSON.parse(localStorage.getItem("immediateRateMovieIds") || "[]")
  ); // movie(s) clicked Rate Now on homepage
  const [ratings, setRatings] = useState(() =>
    JSON.parse(localStorage.getItem("ratings") || "{}")
  );
  const [posters, setPosters] = useState({});
  const [showPopup, setShowPopup] = useState(null);

  // Fetch all movies on mount
  useEffect(() => {
     fetch(`${process.env.REACT_APP_FLASK_API_URL}/api/movies`)
      .then(res => res.json())
      .then(data => setAllMovies(data));
  }, []);

  // Fetch posters for movies
  useEffect(() => {
    const moviesToLoad = [...immediateRateMovieIds, ...ratedMovieIds];
    moviesToLoad.forEach(movieId => {
      if (
        movieId &&
        !posters[movieId] &&
        allMovies.find(m => m.movieId === movieId)?.tmdbId
      ) {
        const tmdbId = allMovies.find(m => m.movieId === movieId).tmdbId;
        getTmdbPosterUrl(tmdbId).then(url => {
          if (url) {
            setPosters(prev => ({ ...prev, [movieId]: url }));
          }
        });
      }
    });
  }, [allMovies, immediateRateMovieIds, ratedMovieIds, posters]);

  // Persist localStorage
  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    localStorage.setItem("ratedMovieIds", JSON.stringify(ratedMovieIds));
  }, [ratedMovieIds]);

  useEffect(() => {
    localStorage.setItem("immediateRateMovieIds", JSON.stringify(immediateRateMovieIds));
  }, [immediateRateMovieIds]);

  // On star click to rate a movie
  const handleRating = (movieId, value) => {
    setRatings(prev => ({ ...prev, [movieId]: value }));
    if (!ratedMovieIds.includes(movieId)) {
      setRatedMovieIds(prev => [...prev, movieId]);
    }
    // Remove from immediate rate list once rated
    if (immediateRateMovieIds.includes(movieId)) {
      setImmediateRateMovieIds(prev => prev.filter(id => id !== movieId));
    }
    setShowPopup(movieId);
    setTimeout(() => setShowPopup(null), 2000);
  };

  // Filter movies for display
  const immediateRateMovies = allMovies.filter(m => immediateRateMovieIds.includes(m.movieId));
  const ratedMovies = allMovies.filter(m => ratedMovieIds.includes(m.movieId) && !immediateRateMovieIds.includes(m.movieId));
  const initialShowMovies = allMovies.slice(0, 30); // first 30 movies to show initially

  // Show initial movies if user has rated no movies
  const showInitial = ratedMovieIds.length === 0 && immediateRateMovieIds.length === 0;

  return (
    <div className="homepage-root">
      <Header />
      <div className="ratings-root">
        {showInitial ? (
          <>
            <h2>Rate These Movies to Get Started</h2>
            <div className="movie-grid">
              {initialShowMovies.map(movie => (
                <MovieCard
                  key={movie.movieId}
                  movie={movie}
                  poster={posters[movie.movieId]}
                  rating={ratings[movie.movieId]}
                  onRate={handleRating}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            {immediateRateMovies.length > 0 && (
              <>
                <h2>Rate Now</h2>
                <div className="movie-grid">
                  {immediateRateMovies.map(movie => (
                    <MovieCard
                      key={movie.movieId}
                      movie={movie}
                      poster={posters[movie.movieId]}
                      rating={ratings[movie.movieId]}
                      onRate={handleRating}
                    />
                  ))}
                </div>
              </>
            )}
            <h2>Your Rated Movies</h2>
            {ratedMovies.length === 0 ? (
              <p>No rated movies yet.</p>
            ) : (
              <div className="movie-grid">
                {ratedMovies.map(movie => (
                  <MovieCard
                    key={movie.movieId}
                    movie={movie}
                    poster={posters[movie.movieId]}
                    rating={ratings[movie.movieId]}
                    onRate={handleRating}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {showPopup !== null && <div className="rating-popup">Rating Submitted!</div>}
      </div>
    </div>
  );
}


// Separate component for each movie card
function MovieCard({ movie, poster, rating, onRate }) {
  return (
    <div className="movie-card">
      <img src={poster || "https://via.placeholder.com/150"} alt={movie.title} />
      <h4>{movie.title}</h4>
      <div>
        {[1, 2, 3, 4, 5].map(num => (
          <span
            key={num}
            style={{ color: rating >= num ? "gold" : "#aaa", cursor: "pointer", fontSize: "1.5em" }}
            onClick={() => onRate(movie.movieId, num)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}
