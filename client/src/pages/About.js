import React from "react";
import Header from "./Header";

export default function About() {
  return (
    <div className="homepage-root">
      <Header />
      <div className="about-content" style={{
        maxWidth: "760px",
        margin: "40px auto",
        background: "rgba(35,10,10,0.65)",
        padding: "28px 30px",
        color: "#fff",
        borderRadius: "20px",
        boxShadow: "0 6px 18px #a005, 0 2px 10px #900b"
      }}>
        <h2 style={{ color: "goldenrod", textAlign: "center", marginBottom: "1.2em" }}>
          About Movie Recommender
        </h2>
        <section id="about">
          <h2>About Movie Recommender</h2>
          <p>
            Welcome to <strong>RecommendMovie</strong>—a personalized movie discovery platform that curates recommendations from both Bollywood and Hollywood cinema using modern AI and data-driven techniques!
          </p>
          <p>
            To begin, visit the <a href="/dashboard">Dashboard</a> where you'll see your top personalized picks based on your previous ratings and preferences. Rate a few movies you know and love—from any genre or language—and watch as the platform tailors its suggestions just for you.
          </p>
          <p>
            Our recommendations are powered by the famous <em>MovieLens dataset</em> and enhanced with collaborative filtering and genre/year insights from a lightweight machine learning model. Whether you love action, drama, comedy, or classics, you'll find new titles to add to your watchlist.
          </p>
          <p>
            This site is built with a <strong>React.js</strong> frontend, <strong>Node/Express</strong> for the API, and a robust <strong>Flask/Python</strong> backend for smart recommendation logic—making discovery easy and fun for all movie lovers.
          </p>
          <p>
            🎬 Ready to dive in? Head to the <a href="/dashboard">Dashboard</a>, rate your favorites, and get instant recommendations. Your next great movie night starts here!
          </p>
          <p>
            Enjoy discovering movies from Bollywood, Hollywood, and beyond—and feel free to share any feedback to help us improve!
          </p>
        </section>
        <section id="credits">
          <h3>Credits</h3>
          <p>
            This platform is independently built—from the frontend interface (React.js) and backend APIs (Node/Express and Flask)
            to the core recommendation engine. The <strong>MovieLens 100K dataset</strong> is used as a foundation for generating recommendations.<br />
            While the collaborative filtering logic was inspired by
            <a href="https://www.kaggle.com/code/faressayah/collaborative-filtering-for-movie-recommendations" target="_blank" rel="noopener noreferrer">
              Fares Sayah's Kaggle notebook
            </a>,
            the machine learning model and implementation for personalized movie suggestions were developed specifically for this site.<br />
            This project was developed by <strong>Khushi</strong>.
          </p>
        </section>

      </div>
    </div>
  );
}
