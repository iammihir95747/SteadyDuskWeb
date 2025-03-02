import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

const Home = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleRegister = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate("/Register"), 300);
    setMenuOpen(false);
  };

  const handleLogin = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate("/Login"), 300); // Redirect to Login page
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Update state manually
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
