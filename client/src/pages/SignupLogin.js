import React, { useState } from "react";
import "./SignupLogin.css";
import { useNavigate } from "react-router-dom";
import Header from "../pages/Header";

export default function SignupLogin() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const switchMode = () => {
    setError("");
    setMode(mode === "login" ? "signup" : "login");
    setForm({ email: "", password: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const endpoint =
      mode === "login"
        ? "http://localhost:5000/api/login"
        : "http://localhost:5000/api/signup";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        navigate("/questionnaire");
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="homepage-root">
      <Header />
      <div style={{ minHeight: "72vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div className="auth-box">
          <h2 style={{ color: "#612024", marginBottom: 5 }}>
            {mode === "login" ? "Hello! Welcome back" : "Sign up to RecommendMovie"}
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button className="main-btn" type="submit">
              {mode === "login" ? "Log in" : "Sign Up"}
            </button>
          </form>
          {error && <div className="auth-error">{error}</div>}
          <div style={{ marginTop: 10, textAlign: "center", color: "#400" }}>
            {mode === "login" ? (
              <>
                New to RecommendMovie?{" "}
                <span className="signup-link" onClick={switchMode}>Sign Up</span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span className="signup-link" onClick={switchMode}>Log in</span>
              </>
            )}
          </div>
        </div>
        <div className="above-footer-blurb">
          <span className="highlight">New to Bollywood?</span>{" "}
          Start with our curated picks.
        </div>
      </div>
      
    </div>
  );
}
