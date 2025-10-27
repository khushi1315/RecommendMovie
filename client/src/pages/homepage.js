import React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Header from "../pages/Header";

const featuredMovies = [
  {
    id: 1,
    title: "Dangal",
    genres: "Action",
    poster_url: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/cJRPOLEexI7qp2DKtFfCh7YaaUG.jpg",
    rating: 4.7,
  },
  {
    id: 2,
    title: "Zindagi Na Milegi Dobara",
    genres: "Comedy",
    poster_url: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/hKO9O715wYxjkQSEv47giCYcyO8.jpg",
    rating: 4.5,
  },
  {
    id: 3,
    title: "3 Idiots",
    genres: "Action",
    poster_url: "https://imgeng.jagran.com/images/2024/12/25/article/image/3-idiots-famous-dialogues-1735123998783.jpg",
    rating: 4.8,
  }
];

const trendingMovies = [
  {
    id: 4,
    title: "Gully Boy",
    genres: "Drama",
    poster_url: "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2019/02/1546595622-ranveer-singh-alia-bhatt-gully-boy-1550115592.jpg",
    rating: 4.3,
  },
  {
    id: 5,
    title: "Tumbbad",
    genres: "Comedy",
    poster_url: "https://tse3.mm.bing.net/th/id/OIP.HW4Op5IkKkaKIXLulu9xiwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.6,
  },
  {
    id: 6,
    title: "Dil Chahta Hai",
    genres: "Comedy",
    poster_url: "https://tse1.explicit.bing.net/th/id/OIP.pTmLt3czG3Kx1IGh_Cyr_QHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.5,
  }
];

function MovieCard({ movie, onRate }) {
  return (
    <div className="movie-card">
      <img src={movie.poster_url} alt={movie.title} />
      <h4>{movie.title}</h4>
      <div>{movie.genres}</div>
      <div>{"⭐".repeat(Math.round(movie.rating))}</div>
      <button onClick={onRate}>Rate Now</button>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-root">
      <Header />
      <section className="hero">
        <h1>Welcome to <br />RecommendMovie</h1>
        <p>Discover movies you'll love. Rate a few to get started!</p>
        <button onClick={() => navigate('/rate')}>Start Rating Now</button>
      </section>
      <section>
        <h2><span className="highlight">Featured</span> Bollywood Movies</h2>
        <div className="movie-grid">
          {featuredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} onRate={() => navigate('/rate')} />
          ))}
        </div>
      </section>
      <section>
        <h2>Trending</h2>
        <div className="movie-grid">
          {trendingMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} onRate={() => navigate('/rate')} />
          ))}
        </div>
      </section>
    </div>
  );
}
