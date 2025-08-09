import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-title">
          <span>Student Report System</span>
        </Link>
      <ul className="navbar-links">
          <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
          <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link></li>
          <li><Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</Link></li>
          <li><Link to="/faq" className={location.pathname === "/faq" ? "active" : ""}>FAQ</Link></li>
          <li><Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link></li>
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;