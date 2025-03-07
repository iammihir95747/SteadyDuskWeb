import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state when component mounts or token changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Function to update login state after login/logout
  const updateLoginState = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  const handleRegister = () => {
    navigate("/register");
    setMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    updateLoginState(); // Update state after removing token
    setMenuOpen(false);
    navigate("/"); // Redirect after logout
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="nav-logo">Steady Dusk</div>
        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li><Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/services" className="nav-link" onClick={() => setMenuOpen(false)}>Services</Link></li>
          <li><Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>About</Link></li>
          <div className="mobile-auth-buttons">
            {!isLoggedIn ? (
              <>
                <button className="nav-button-login" onClick={handleLogin}>Login</button>
                <button className="nav-button" onClick={handleRegister}>Sign up for free</button>
              </>
            ) : (
              <button className="nav-button-logout" onClick={handleLogout}>Logout</button>
            )}
          </div>
        </ul>
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
      </div>

      <div className="nav-right desktop-only">
        {!isLoggedIn ? (
          <>
            <button className="nav-button-login" onClick={handleLogin}>Login</button>
            <button className="nav-button" onClick={handleRegister}>Sign up for free</button>
          </>
        ) : (
          <button className="nav-button-logout" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
