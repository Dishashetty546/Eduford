import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/login";
import Signup from "./components/signup";

function App() {
  const [theme, settheme] = useState("light");

  return (
    <Router>
      <div className={`container ${theme}`}>
        <Navbar theme={theme} settheme={settheme} />
        <Routes>
          <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
