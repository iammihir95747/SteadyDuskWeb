import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

const Home = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // ✅ Update `isLoggedIn` whenever localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Fix: Listen to token changes on login page
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [localStorage.getItem("token")]); // 🔥 This makes sure `isLoggedIn` updates instantly after login/logout.

  const handleRegister = () => {
    navigate("/Register");
    setMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/Login");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Remove token
    setIsLoggedIn(false); // ✅ Ensure state updates instantly
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <div className="nav-logo">Steady Dusk</div>
          <div className="menu-toggle" onClick={toggleMenu}>
            ☰
          </div>
        </div>

        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/Homepage" className="navlink" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/Services" className="navlink" onClick={toggleMenu}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/About" className="navlink" onClick={toggleMenu}>
              About
            </Link>
          </li>
        </ul>

        <div className="nav-right desktop-only">
          {isLoggedIn ? (
            <button className="nav-button-log" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <button className="nav-button-log" onClick={handleLogin}>
                Login
              </button>
              <button className="nav-button" onClick={handleRegister}>
                Get Started - It's free
              </button>
            </>
          )}
        </div>

        {menuOpen && (
          <div className="mobil-auth-buttons">
            <hr className="hrformobile" />
            {isLoggedIn ? (
              <button className="nav-button-log-mob" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <button className="nav-button-log-mob" onClick={handleLogin}>
                  Login
                </button>
                <br />
                <button className="nav-button-mob" onClick={handleRegister}>
                  Get Started
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Home;
