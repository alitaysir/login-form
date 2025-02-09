import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirecting

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Handle Logout
  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem("authToken");
    // Redirect the user to the login page
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar */}
      <AppBar position="sticky">
        <Toolbar>
          {/* Podtech Branding */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Podtech
          </Typography>
          
          {/* Logout Button */}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ marginTop: 6 }}>
        <Box textAlign="center" sx={{ padding: 2 }}>
          <Typography variant="h2" gutterBottom>
            Welcome to Podtech!
          </Typography>
          <Typography variant="h5" color="textPrimary">
            Podtech is a leading innovator in the tech industry. We specialize in
            creating cutting-edge solutions that help businesses stay ahead of the curve. 
            Our team is dedicated to building scalable products with an emphasis on
            performance, usability, and security.
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{marginTop: 2}}>
            At Podtech, we believe in pushing boundaries and creating technologies that make a
            difference in the world. Join us as we continue to revolutionize the future.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
