import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { SignJWT } from 'jose'; // Import jose for browser-compatible JWT
import { toast } from 'react-toastify';

function Signup() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Step 1: Define state to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    name: Yup.string().required("First Name is Required"),
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Step 2: Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Dynamically set state for different inputs
    });
  };

  // Step 3: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on submit
    const { name, email, password } = formData;

    try {
      // Validate the form data
      await validationSchema.validate(formData, { abortEarly: false });

      // Retrieve existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Check if the email already exists in the existingUsers array
      if (existingUsers.some((user) => user.email === email)) {
        toast.error("User already exists!");
        return; // Stop further execution if the user already exists
      }

      // Create new user and save in localStorage
      const newUser = { name, email, password };
      existingUsers.push(newUser);

      // Save updated users list in localStorage
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Generate a JWT Token (Use a secret key for signing)
      const secretKey = "your-secret-key";
      const token = await new SignJWT({ email })
        .setProtectedHeader({ alg: "HS256" })
        .sign(new TextEncoder().encode(secretKey));

      // Store the token in localStorage
      localStorage.setItem("authToken", token);

      // Notify user of successful registration and redirect to home
      toast.success("User registered successfully!");
      navigate("/"); // Redirect to the home page

    } catch (error) {
      const newErrors = {};

      // Handle validation error messages
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
      toast.error("Failed to register user");
    }
  };

  // Handle "Login" click (Navigate to Login Page)
  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          Sign Up
        </Typography>

        {/* Name Input */}
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
        />
        {errors.name && (
          <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
            {errors.name}
          </Typography>
        )}

        {/* Email Input */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
        />
        {errors.email && (
          <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
            {errors.email}
          </Typography>
        )}

        {/* Password Input */}
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
        />
        {errors.password && (
          <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
            {errors.password}
          </Typography>
        )}

        {/* Confirm Password Input */}
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          name="confirmpassword"
          value={formData.confirmpassword}
          onChange={handleChange}
          error={!!errors.confirmpassword}
        />
        {errors.confirmpassword && (
          <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
            {errors.confirmpassword}
          </Typography>
        )}

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>

        {/* Login Redirect Link */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body2">
            Already an existing user?{" "}
            <Button onClick={handleLoginRedirect} color="primary" sx={{ p: 0 }}>
              Login
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Signup;
