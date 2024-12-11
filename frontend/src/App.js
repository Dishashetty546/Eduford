import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import Sidebar from "./components/sidebar";
import Profile from "./components/profile";
import Testpage from "./components/testpage";
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/testpage" element={<Testpage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
