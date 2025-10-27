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
          About Bollywood Movie Recommender
        </h2>
        <p>
          This project is a personalized Bollywood movie recommendation platform using a mix of classical data filtering and modern machine learning! Answer a few simple questions―your favorite genres, year, or films you love―and let our smart backend suggest the best-matching Bollywood movies for you.
        </p>
        <ul style={{ paddingLeft: "18px" }}>
          <li>
            Uses the powerful <b>MovieLens dataset</b> and a lightweight deep learning collaborative model.
          </li>
          <li>
            Combines your preferences with genre and year filtering to provide meaningful movie suggestions.
          </li>
          <li>
            Built with <b>React.js</b> (frontend), <b>Node/Express</b> (API gateway), and <b>Flask/Python</b> for the ML backend!
          </li>
        </ul>
        <p>
          Created for movie buffs looking to discover new favorites, or just get recommendations based on what you genuinely enjoy. Try it out from the dashboard page, rate your experience, and help us improve!
        </p>
        <p style={{ textAlign: "center", marginTop: "2em", fontStyle: "italic", color: "#ffd700" }}>
          Happy Watching!
        </p>
      </div>
    </div>
  );
}
