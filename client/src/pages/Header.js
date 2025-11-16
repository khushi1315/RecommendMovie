import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import "./header.css";
export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const loggedIn = localStorage.getItem("userLoggedIn");
  const userName = localStorage.getItem("userName");

  function handleProfileClick() {
    setDropdownOpen((open) => !open);
  }
  function handleLogin() {
    navigate("/signup");
    setDropdownOpen(false);
  }
  function handleLogout() {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userName");
    navigate("/");
    setDropdownOpen(false);
  }
  // Optional: Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);

  return (
    <nav className="top-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
        <li style={{ marginRight: 20 }}><Link to="/">Home</Link></li>
        <li style={{ marginRight: 20 }}><Link to="/about">About</Link></li>
        <li style={{ marginRight: 20 }}><Link to="/signup">Sign Up</Link></li>
        <li style={{ marginRight: 20 }}>
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
        <li style={{ marginRight: 20 }}><Link to="/rate">RatingPage</Link></li>
      </ul>
      <div className="navbar-right" style={{ position: "relative" }} ref={dropdownRef}>
        <button
          className="profile-btn"
          aria-label="Profile"
          onClick={handleProfileClick}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            borderRadius: "50%",
            padding: 0,
            overflow: "hidden",
            outline: "none"
          }}
        >
          <FaUserCircle size={32} style={{ borderRadius: "50%" }} />
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu" style={{
            position: "absolute",
            top: "120%",
            right: 0,
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            borderRadius: "8px",
            minWidth: "140px",
            zIndex: 20,
            padding: "0.6em 1em",
            textAlign: "left",
          }}>
            {loggedIn ? (
              <>
                <div style={{ marginBottom: "0.5em" }}>
                  Hello, <span style={{ fontWeight: "bold" }}>{userName}</span>
                </div>
                <button onClick={handleLogout} style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#e53935",
                  width: "100%",
                  textAlign: "left",
                  fontSize: "1em",
                  padding: "0.3em 0"
                }}>
                  Logout
                </button>
              </>
            ) : (
              <button onClick={handleLogin} style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#3949ab",
                width: "100%",
                textAlign: "left",
                fontSize: "1em",
                padding: "0.3em 0"
              }}>
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
