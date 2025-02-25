import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

const Home = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleRegister = () => navigate("/Register");
  const handleLogin = () => navigate("/Login");
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">  
          <div className="nav-logo">Steady Dusk</div>
          <div className="menu-toggle" onClick={toggleMenu}>
            ☰ {/* Hamburger Icon */}
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
          {/* <li>
            <Link to="/" className="navlink" onClick={toggleMenu}>
              Admin
            </Link>
          </li> */}
        </ul>

        <div className="nav-right">

        <button className="nav-button-log" onClick={handleLogin}>
            Login
          </button>
          <button className="nav-button" onClick={handleRegister}>
            Get Started - It's free
          </button>
         
        </div>
      </nav>
      <hr className="hrfornav" />
    </>
  );
};

export default Home;
