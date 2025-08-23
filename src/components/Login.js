// components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  if (user) {
    return (
      <div className="login-container">
        <h2>Welcome, {user.username || 'User'} 🎉</h2>
        <p>You are now logged in.</p>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <img 
          src="https://i.ytimg.com/vi/TpnCCAuNSAQ/maxresdefault.jpg" 
          alt="Login Illustration" 
          className="login-image"
        />
      </div>

      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        <div className="login-options">
          <p>Or login with:</p>
          <div className="social-icons">
            <button className="social-btn google"><FaGoogle /> Google</button>
            <button className="social-btn github"><FaGithub /> GitHub</button>
            <button className="social-btn linkedin"><FaLinkedin /> LinkedIn</button>
          </div>
        </div>

        <div className="signup-link">
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
