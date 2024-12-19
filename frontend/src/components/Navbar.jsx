import React from 'react';
import { Link } from 'react-router-dom';
import './app.css';
import logo_dark from '../../src/assets/logo-white.png';  // Dark mode logo (white logo)
import toggle_dark from '../../src/assets/day.png';      // Dark mode toggle (moon icon)

const Navbar = () => {
  return (
    <div className="navbar dark">
      {/* Display dark mode logo */}
      <img src={logo_dark} alt="Logo" className="logo" />
      <ul>
        <li><a href="#feature1">Services</a></li>
        <li><a href="#feature2">About us</a></li>
        <li>Home</li>
      </ul>
      <Link to="/login" className="button">Login</Link>
      {/* Dark mode toggle icon */}
      <img
        src={toggle_dark}
        alt="Toggle Theme"
        className="toggle-icon"
      />
    </div>
  );
};

export default Navbar;
