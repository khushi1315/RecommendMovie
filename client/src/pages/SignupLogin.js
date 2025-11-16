import React, { useState } from "react";
import "./SignupLogin.css";
import { useNavigate } from "react-router-dom";
import Header from "../pages/Header";

export default function SignupLogin() {
  const [mode, setMode] = useState("login"); // "login" | "signup" | "forgot"
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const switchMode = () => {
    setError("");
    setMessage("");
    setForm({ email: "", password: "" });
    setMode(mode === "login" ? "signup" : "login");
  };

  const switchToForgot = () => {
    setError("");
    setMessage("");
    setForm({ email: "", password: "" });
    setMode("forgot");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    let endpoint = "";
    let body = {};
    if (mode === "login") {
      endpoint = `${process.env.REACT_APP_API_URL}/api/login`;
      body = { email: form.email, password: form.password };
    } else if (mode === "signup") {
      endpoint = `${process.env.REACT_APP_API_URL}/api/signup`;
      body = { email: form.email, password: form.password };
    } else if (mode === "forgot") {
      endpoint = `${process.env.REACT_APP_API_URL}/api/forgot-password`;
      body = { email: form.email };
    }


    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        if (mode === "forgot") {
          setMessage("If your email is registered, reset instructions have been sent.");
          setMode("login");
        } else {
          // Login or Signup success: Set localStorage for user session
          localStorage.setItem("userLoggedIn", "true");
          localStorage.setItem("userName", form.email); // Or use data.user.name if backend sends
          navigate("/");
        }
      } else {
        setError(data.error || "Operation failed");
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
          {mode === "login" && <h2 style={{ color: "#612024", marginBottom: 5 }}>Hello! Welcome back</h2>}
          {mode === "signup" && <h2 style={{ color: "#612024", marginBottom: 5 }}>Sign up to RecommendMovie</h2>}
          {mode === "forgot" && <h2 style={{ color: "#612024", marginBottom: 5 }}>Reset Your Password</h2>}

          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            {mode !== "forgot" && (
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            )}
            <button className="main-btn" type="submit">
              {mode === "login" && "Log in"}
              {mode === "signup" && "Sign Up"}
              {mode === "forgot" && "Send Reset Email"}
            </button>
          </form>

          {mode === "login" && (
            <div style={{ marginTop: 10, textAlign: "center", color: "#400" }}>
              <span className="signup-link" onClick={switchToForgot}>Forgot Password?</span>
            </div>
          )}

          {error && <div className="auth-error">{error}</div>}
          {message && <div style={{ color: "green", marginTop: 10 }}>{message}</div>}

          <div style={{ marginTop: 10, textAlign: "center", color: "#400" }}>
            {mode === "login" ? (
              <>
                New to RecommendMovie?{" "}
                <span className="signup-link" onClick={switchMode}>Sign Up</span>
              </>
            ) : mode === "signup" ? (
              <>
                Already have an account?{" "}
                <span className="signup-link" onClick={switchMode}>Log in</span>
              </>
            ) : null}
          </div>
        </div>
        <div className="above-footer-blurb">
          <span className="highlight">New to movies?</span>{" "} Start with our curated picks.
        </div>
      </div>
    </div>
  );
}
