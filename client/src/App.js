import React from 'react';

import HomePage from "./pages/homepage";
import About from "./pages/About";
import SignupLogin from "./pages/SignupLogin";
import Dashboard from "./pages/dashboard";
import { Routes, Route } from "react-router-dom";
import RatingPage from "./pages/RatingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<SignupLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
     
      <Route path="/rate" element={<RatingPage />} />
    </Routes>
  );
}

export default App;
