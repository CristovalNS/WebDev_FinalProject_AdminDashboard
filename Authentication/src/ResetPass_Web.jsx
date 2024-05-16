// ForgotPass_Web.jsx

import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const ResetPass = () => {
  return (
    <div className="flex-container">
      <div className="sidebar"></div>
      <div className="main-content">
        <h1 className="resetpass-title">Reset password</h1>

        <p className="pass-rplabel">New password</p>
        <input type="text" className="pass_rptext-field" placeholder="Create a new password"/>

        <p className="confirm-rplabel">Confirm password</p>
        <input type="text" className="confirm_rptext-field" placeholder="Confirm new password"/>

        <button className="resetpass-button">Reset password</button>

        <p className="resetback-label"><Link to="/" style={{ color: '#FAF9EB', textDecoration: 'none' }}>Back to login</Link></p>
      </div>
    </div>
  );
};

export default ResetPass;