import React, { useState, useEffect } from "react";
import Header from "./Header";
import Questionnaire from "./Questionnaire";

export default function Dashboard() {
   


  // const [showModal, setShowModal] = useState(() => !localStorage.getItem("questionnaireFilled"));
  const [showModal, setShowModal] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  // Called when questionnaire is submitted
  const handleQuestionnaireSubmit = (answers) => {
    // For now, just mark as filled; pass to backend if you adjust backend to use them!
    localStorage.setItem("questionnaireFilled", "true");
    setShowModal(false);

    // Send questionnaire data to backend (adjust endpoint as needed)
    fetch("http://localhost:5000/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    })
      .then(res => res.json())
      .then(data => setRecommendations(data.recommendations || []));
  };

  // For demo, if already filled, fetch on first mount:
  useEffect(() => {
    if (!showModal) {
      fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })
        .then(res => res.json())
        .then(data => setRecommendations(data.recommendations || []));
    }
  }, [showModal]);


  return (
    <div className="homepage-root">
      <Header />
      <Questionnaire
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleQuestionnaireSubmit}
      />
      {!showModal && (
        <div className="dashboard-root">
          <h2>Your Top 10 Personalized Bollywood Movies</h2>
          <div className="movie-grid">
            {recommendations.map((movie, idx) => (
              <div className="movie-card" key={movie.movieId || idx}>
                <h4>{movie.title}</h4>
                <div>{movie.genres}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
  
}
