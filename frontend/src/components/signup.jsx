import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './app.css';
import { FaLock, FaUser } from "react-icons/fa";
import signup from '../assets/signup.png';

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
    <div className='Wrapper' style={{
      backgroundImage: `url(${signup})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="login">
        <form className="form-box" onSubmit={handleSubmit}>
          <h1>Signup</h1>
          <input
            className='input-box'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <FaUser className='icon' />
          <input
            className='input-box'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <FaLock className='icon' />
          <div className='remember-forgot'>
            <label> <input type="checkbox" />Remember me</label>
          </div>
          <button>Sign Up</button>
          <p>OR</p>
          <div className='register-link'>
            <p>Already have an account?</p>
          </div>
          <Link className="signup" to="/login">Login here</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
