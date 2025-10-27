// src/components/Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  // const handleDashboardClick = () => {
  //   const filled = localStorage.getItem("questionnaireFilled");
  //   if (filled) {
  //     navigate("/dashboard");
  //   } else {
  //     navigate("/questionnaire");
  //   }
  // };
  return (
    <nav className="top-nav">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li>
  <button
    onClick={() => navigate("/dashboard")}
    style={{
      background: "none",
      border: "none",
      color: "inherit",
      cursor: "pointer",
      font: "inherit",
      padding: 0,
      margin: 0
    }}
  >
    Dashboard
  </button>
</li>

        <li><Link to="/rate">RatingPage</Link></li>
      </ul>
      <input placeholder="Search bollywood titles..." />
    </nav>
  );
}
