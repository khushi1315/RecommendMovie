import React, { useState } from "react";
import "./Questionnaire.css"; // Style for modal background and box

export default function Questionnaire({ open, onSubmit, onClose }) {
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [favMovie, setFavMovie] = useState("");

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (genre && year && favMovie) {
      onSubmit({ genre, year, favMovie });
      onClose();
    }
  }

  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h3>Personalize Your Recommendations</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Favorite Genre:
            <select value={genre} onChange={e => setGenre(e.target.value)} required>
              <option value="">--Choose--</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Romance">Romance</option>
              {/* Add more genres as needed */}
            </select>
          </label>
          <label>
            Favorite Year:
            <input
              type="number"
              min="1900"
              max="2025"
              value={year}
              onChange={e => setYear(e.target.value)}
              required
            />
          </label>
          <label>
            All-Time Favorite Movie:
            <input
              type="text"
              value={favMovie}
              onChange={e => setFavMovie(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="main-btn">Get Recommendations</button>
        </form>
      </div>
    </div>
  );
}
