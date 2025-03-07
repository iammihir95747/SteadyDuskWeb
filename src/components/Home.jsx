import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check token on mount
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("token", "your-token"); // Simulating login
    setIsLoggedIn(true);
    navigate("/login");
    setMenuOpen(false);
  };

  const handleRegister = () => {
    localStorage.setItem("token", "your-token"); // Simulating register
    setIsLoggedIn(true);
    navigate("/register");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="nav-logo">Steady Dusk</div>
        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li><Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/services" className="nav-link" onClick={toggleMenu}>Services</Link></li>
          <li><Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link></li>
          {/* Mobile Auth Buttons */}
          <div className="mobile-auth-buttons">
            {isLoggedIn ? (
              <button className="nav-button-logout" onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <button className="nav-button-login" onClick={handleLogin}>Login</button>
                <button className="nav-button" onClick={handleRegister}>Sign up for free</button>
              </>
            )}
          </div>
        </ul>
        <div className="menu-toggle" onClick={toggleMenu}>☰</div>
      </div>

      {/* Right Section (Buttons) */}
      <div className="nav-right desktop-only">
        {isLoggedIn ? (
          <button className="nav-button-logout" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button className="nav-button-login" onClick={handleLogin}>Login</button>
            <button className="nav-button" onClick={handleRegister}>Sign up for free</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
