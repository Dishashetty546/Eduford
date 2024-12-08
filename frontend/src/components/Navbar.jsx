import React from 'react';
import { Link } from 'react-router-dom';
import './app.css';
import logo_light from '../../src/assets/logo-black.png';
import logo_dark from '../../src/assets/logo-white.png';
import toggle_light from '../../src/assets/night.png';
import toggle_dark from '../../src/assets/day.png';

const Navbar = ({ theme, settheme }) => {
  const toggle_mode = () => {
    theme === "light" ? settheme("dark") : settheme("light");
  };

  return (
    <div className="navbar">
      <img src={theme === "light" ? logo_light : logo_dark} alt="" className="logo" />
      <ul>
        <li>Home</li>
        <li>About us</li>
        <li>Services</li>
      </ul>
      <Link to="/login" className="button">Login</Link>
      <img
        onClick={toggle_mode}
        src={theme === "light" ? toggle_light : toggle_dark}
        alt=""
        className="toggle-icon"
      />
    </div>
  );
};

export default Navbar;
