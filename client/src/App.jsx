import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Importing pages
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
// import Cart from '../pages/Cart';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // Redirect based on authentication and current path
    if (!token) {
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup"
      ) {
        navigate("/login"); // Redirect unauthenticated users to login
      }
    }
  }, [navigate]);

  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
