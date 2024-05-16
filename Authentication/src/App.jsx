// App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './style.css';
import Login from "./Login_Web";
import Register from "./Register_Web";
import ForgotPass from "./ForgotPass_Web";
import ResetPass from "./ResetPass_Web";
// import ForgotPassPhone from "./ForgotPass_phone_Web";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/resetpass" element={<ResetPass />} />
      </Routes>
    </Router>
  );
}

export default App
