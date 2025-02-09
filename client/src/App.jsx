import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Importing pages
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has a token and is trying to access the login/signup page
    const token = localStorage.getItem("authToken");

    if (token) {
      // If token exists, redirect directly to Home
      navigate("/");
    } else {
      // If there's no token and trying to access the Home page, redirect to login
      if (window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected route - home page */}
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
