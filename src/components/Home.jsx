import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

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
    setIsLoggedIn(false);
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      {/* Left Section (Logo + Menu) */}
      <div className="nav-left">
        <div className="nav-logo">Steady Dusk</div>
        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li><Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/services" className="nav-link" onClick={toggleMenu}>Services</Link></li>
          <li><Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link></li>
          {/* Mobile Auth Buttons */}
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
            <div className="menu-toggle" onClick={toggleMenu}>☰</div>
      </div>

      {/* Right Section (Buttons) */}
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

      {/* Menu Toggle Button */}
      
    </nav>
  );
};

export default Navbar;
