import React, { useState } from 'react';
import './style.css';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setRegistrationError('Passwords do not match.');
      return;
    }

    const userDetails = {
      email,
      username: fullName,
      password,
      user_type: 1 
    };

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();
      if (response.status === 200) {
        console.log('Registration successful:', data);
        // Redirect or update UI here
      } else {
        setRegistrationError('Registration failed: ' + data.detail);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setRegistrationError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex-container">
      <div className="sidebar"></div>
      <div className="main-content">
        <h1 className="signup-title">Sign up</h1>

        <p className="fullname-label">Full name</p>
        <input
          type="text"
          className="fullname_text-field"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <p className="email-label">Email address</p>
        <input
          type="email"
          className="email_text-field"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p className="signuppass-label">Password</p>
        <input
          type="password"
          className="signuppass_text-field"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="confirmpass-label">Confirm password</p>
        <input
          type="password"
          className="confirmpass_text-field"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="signup-button" onClick={handleSignUp}>Sign up</button>
        {registrationError && <p className="error-text">{registrationError}</p>}

        <div className="alternative-signup">
          <div className="line"></div>
          <p className="separator-text">or sign up with</p>
          <div className="line"></div>
        </div>

        <div className="signupbtn-container">
          <button className="icon-button"><FcGoogle size={24} /></button>
        </div>

        <p className="login-label"><Link to="/" style={{ color: '#DFD9C3', textDecoration: 'none' }}>Already have an account? Log in</Link></p>
      </div>
    </div>
  );
};

export default Register;
