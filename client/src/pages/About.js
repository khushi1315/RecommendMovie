// pages/About.js

import React from "react";
import Header from "./Header"; // adjust import if Header is in components/

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
          About Bollywood Movie Recommender</h2>
          <section id="about">
            <h2>About Bollywood Movie Recommender</h2>
            <p>
              Welcome to <strong>RecommendMovie</strong>—a personalized Bollywood movie recommendation platform that blends classical data filtering with modern machine learning!
            </p>
            <p>
              To get started, head to the <a href="/dashboard">Dashboard</a>, where you'll be guided through a short <strong>questionnaire</strong>. Just answer a few simple prompts—your favorite genres, release years, or Bollywood films you love—and our intelligent backend will generate tailored movie recommendations just for you.
            </p>
            <p>
              We use the powerful <em>MovieLens dataset</em> and a lightweight <em>deep learning collaborative filtering model</em> to combine your preferences with genre and year filters, ensuring meaningful suggestions every time.
            </p>
            <p>
              Built with <strong>React.js</strong> for the frontend, <strong>Node/Express</strong> as the API gateway, and <strong>Flask/Python</strong> for the ML engine, this platform is designed for movie buffs eager to discover new favorites.
            </p>
            <p>
              🎬 Ready to explore? Visit the <a href="/dashboard">Dashboard</a>, complete the questionnaire, and let the recommendations roll in.
            </p>
            <p>
              Happy watching—and we’d love your feedback to keep improving!
            </p>
          </section>
<section id="credits">
  <h3>Credits</h3>
  <p>
    The machine learning model powering our recommendations is inspired by the work of  
     <a href="https://www.kaggle.com/code/faressayah/collaborative-filtering-for-movie-recommendations" target="_blank">
      Fares Sayah
    </a> on Kaggle, titled <em>Collaborative Filtering for Movie Recommendations</em>.
    We gratefully acknowledge the use of the <strong>MovieLens 100K dataset</strong> in training our collaborative filtering engine.
  </p>
</section>

      </div>
    </div>
  );
}
