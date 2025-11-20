import React from "react";
import Header from "./Header";

export default function About() {
  return (
    <div className="homepage-root">
      <Header />
      <div
        className="about-content"
        style={{
          maxWidth: "760px",
          margin: "40px auto",
          background: "rgba(35,10,10,0.65)",
          padding: "28px 30px",
          color: "#fff",
          borderRadius: "20px",
          boxShadow: "0 6px 18px #a005, 0 2px 10px #900b"
        }}
      >
        <h2
          style={{
            color: "goldenrod",
            textAlign: "center",
            marginBottom: "1.2em"
          }}
        >
          About RecommendMovie
        </h2>

        <section id="about">
          <h2>About the Project</h2>

          <p>
            <strong>RecommendMovie</strong> is a full-stack movie discovery
            platform built using <strong>React.js</strong>,
            <strong> Node/Express</strong>, and <strong>Flask/Python</strong>.
            It helps users explore films they might enjoy by using both
            preference-based filtering and machine learning techniques.
          </p>

          <p>
            The system uses the well-known{" "}
            <strong>MovieLens dataset</strong> as the core database for movie
            information. Users can rate movies, select their favorite genres or
            years, and instantly get suggestions tailored to their taste.
          </p>

          <h3>How Recommendations Work</h3>

          <p>
            RecommendMovie currently supports <strong>two</strong> types of
            recommendation logic:
          </p>

          <ul>
            <li>
              <strong>Rule-Based Recommendations (Live on the Website)</strong>  
              <br />
              The website uses lightweight filtering based on:
              <ul>
                <li>Preferred genre</li>
                <li>Release year</li>
                <li>Smart fallback to the closest year if no match is found</li>
              </ul>
              This ensures fast responses and stable performance in deployment.
            </li>

            
          </ul>

          <p>
            This hybrid design keeps the platform fast, scalable, and easy to
            extend while maintaining a real machine learning component in the
            backend.
          </p>

          <p>
            🎬 Explore your personalized picks on the{" "}
            <a href="/dashboard">Dashboard</a>—your next great movie night starts
            here!
          </p>
        </section>

        <section id="credits" style={{ marginTop: "2em" }}>
          <h3>Credits</h3>
          <p>
            The platform was designed and developed end-to-end—from frontend UI
            to backend APIs—using React.js, Node/Express, and Flask.
          </p>

          <p>
            The recommendation dataset comes from the{" "}
            <strong>MovieLens project</strong>.  
            The collaborative filtering model architecture was inspired by{" "}
            <a
              href="https://www.kaggle.com/code/faressayah/collaborative-filtering-for-movie-recommendations"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fares Sayah’s Kaggle notebook
            </a>
            , but the integration, preprocessing, and training setup were
            implemented specifically for this platform.
          </p>

          <p>
            This project was designed and developed by{" "}
            <strong>Khushi</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
