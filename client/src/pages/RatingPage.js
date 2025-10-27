import React, { useState } from "react";
import "./RatingsPage.css"; // style as needed
import Header from "../pages/Header";

const moviesToRate = [
  {
    id: 1,
    title: "Dangal",
    poster_url: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/cJRPOLEexI7qp2DKtFfCh7YaaUG.jpg",
  },
  {
    id: 2,
    title: "3 Idiots",
    poster_url: "https://imgeng.jagran.com/images/2024/12/25/article/image/3-idiots-famous-dialogues-1735123998783.jpg",
  },
  {
    id: 3,
    title: "Bajrangi Bhaijaan",
    poster_url: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/vhlliI7HZZlWfo5d6CiyfBAGLrW.jpg",
  },
  {
    id: 4,
    title: "Zindagi Na Milegi Dobara",
    poster_url: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/hKO9O715wYxjkQSEv47giCYcyO8.jpg",
  },
  {
    id: 5,
    title: "Barfi!",
    poster_url: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/5cJIx2zKjDoUtPSliou23xsReb1.jpg",
  },
  {
    id: 6,
    title: "tummbad",
    poster_url: "https://tse3.mm.bing.net/th/id/OIP.HW4Op5IkKkaKIXLulu9xiwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 7,
    title: "Gully boy",
    poster_url: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/jZRTMZESWlLqeg5JxdHz8bXlG7p.jpg",
  }
];

export default function RatingsPage() {
  const [ratings, setRatings] = useState({});

  const handleRating = (movieId, value) => {
    setRatings(prev => ({ ...prev, [movieId]: value }));
  };

  const handleSubmit = () => {
    alert("Ratings submitted: " + JSON.stringify(ratings));
    // send to backend here if ready, then navigate to dashboard or recommendations
  };

  return (
    <div className="homepage-root">
      <Header />
      <div className="ratings-root">
        <h2>Rate These Movies to Get Started</h2>
        <div className="movie-grid">
          {moviesToRate.map(movie => (
            <div className="movie-card" key={movie.id}>
              <img src={movie.poster_url} alt={movie.title} />
              <h4>{movie.title}</h4>
              <div>
                {[1, 2, 3, 4, 5].map(num => (
                  <span
                    key={num}
                    style={{ color: ratings[movie.id] >= num ? "gold" : "#aaa", cursor: "pointer", fontSize: "1.5em" }}
                    onClick={() => handleRating(movie.id, num)}
                  >★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="submit-btn" onClick={handleSubmit}>Submit Ratings</button>
      </div>
    </div>
  );
}
