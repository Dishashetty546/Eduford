import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

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
    <div className='Wrapper'>
    <div className="login">
      <h1>Login</h1>
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
        <input type="submit" value="Login" />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/signup">Sign up here</Link>
    </div>
    </div>
  );
};

export default Login;
