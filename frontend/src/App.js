import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import Sidebar from "./components/sidebar";
import Profile from "./components/profile";
import Testpage from "./components/testpage";
import Home from "./components/home";

function AppContent({ theme, settheme }) {
  const location = useLocation();

  // List of paths where the Navbar should be hidden
  const hideNavbarPaths = ["/dashboard", "/testpage"]; // Combine paths here

  return (
    <div className={`container ${theme}`}>
      {/* Conditionally render Navbar */}
      {!hideNavbarPaths.includes(location.pathname) && (
        <Navbar theme={theme} settheme={settheme} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/testpage" element={<Testpage />} />
        {/* Redirect undefined paths to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  const [theme, settheme] = useState("light");

  return (
    <Router>
      <AppContent theme={theme} settheme={settheme} />
    </Router>
  );
}

export default App;
