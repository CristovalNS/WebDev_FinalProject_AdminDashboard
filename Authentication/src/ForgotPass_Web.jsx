// ForgotPass_Web.jsx

import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const ForgotPass = () => {
  return (
    <div className="flex-container">
      <div className="sidebar"></div>
      <div className="main-content">
        <h1 className="forgotpass-title">Forgot your password?</h1>
        <p className="desc-label">Please enter the email address or phone number you'd like your password reset information to be sent to.</p>

        <p className="fp-label">Email address or phone number</p>
        <input type="text" className="fp_text-field" placeholder="Enter email address of phone number"/>

        <button className="reset-button">Request reset link</button>

        <p className="back-label"><Link to="/" style={{ color: '#FAF9EB', textDecoration: 'none' }}>Back to login</Link></p>
      </div>
    </div>
  );
};

export default ForgotPass;
