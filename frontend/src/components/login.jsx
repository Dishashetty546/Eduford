import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';
import {FaLock, FaUser} from "react-icons/fa";
import background from '../assets/background.png'


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/", { email, password });
      if (response.data === "exist") {
        navigate("/home", { state: { id: email } });
      } else if (response.data === "not exist") {
        alert("User has not signed up");
      }
    } catch (error) {
      alert("Wrong details");
      console.log("Error during login:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='Wrapper' style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
    <div className="login">

  
      <form  className=" form-box" onSubmit={handleSubmit}>
      <h1>Login</h1>
        <input className='input-box'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        
        />
          <FaUser className='icon'/>
        <input
        className='input-box'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <FaLock className='icon'/>
        <div className='remember-forgot'> 
          <label> <input type="checkbox"/>Remember me</label>
          <a href="#">Forgot Password</a>
        </div>
        <button>Login</button>
      <p>OR</p>
      <div className='register-link'>
        <p>Don't have an account?</p>
      </div>
     <Link className="signup" to="/signup">Sign up here</Link>
      </form>
    </div>
    </div>
  );
};

export default Login;
