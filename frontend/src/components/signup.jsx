import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", { email, password });
      if (response.data === "exist") {
        alert("User already exists");
      } else if (response.data === "not exist") {
        navigate("/home", { state: { id: email } });
      }
    } catch (error) {
      alert("Signup failed. Please try again.");
      console.error("Signup failed:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="signup">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input type="submit" value="Sign Up" />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/login">Login page</Link>
    </div>
  );  
};

export default Signup;
