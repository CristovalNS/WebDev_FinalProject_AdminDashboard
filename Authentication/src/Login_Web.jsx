import React, { useState } from 'react';
import './style.css';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginDetails = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginDetails),
      });

      const data = await response.json();
      if (response.status_code === 200) {
        console.log('Login successful:', data);
        // Redirect or update UI here
      } else {
        setLoginError('Login failed: ' + data.detail);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex-container">
      <div className="sidebar"></div>
      <div className="main-content">
        <h1 className="login-title">Log in</h1>

        <p className="user-label">Email or phone number</p>
        <input
          type="text"
          className="user_text-field"
          placeholder="Enter email address or phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p className="pass-label">Password</p>
        <input
          type="password"
          className="pass_text-field"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleLogin}>Log in</button>
        {loginError && <p className="error-text">{loginError}</p>}

        <div className="alternative-login">
          <div className="line"></div>
          <p className="separator-text">or log in with</p>
          <div className="line"></div>
        </div>

        <div className="button-container">
          <button className="icon-button"><FcGoogle size={24} /></button>
        </div>

        <p className="forgotpass-label"><Link to="/forgotpass" style={{ color: '#FAF9EB', textDecoration: 'none' }}>Forgot your password?</Link></p>
        <p className="signup-label"><Link to="/register" style={{ color: '#FAF9EB', textDecoration: 'none' }}>Don't have an account? Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
