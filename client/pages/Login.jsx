import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from 'react-toastify';
import { SignJWT } from 'jose'; // Import jose for browser-compatible JWT


function Login() {
  // Step 1: Define state to hold form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); 
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
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
    try {
      // Validate form data
      await validationSchema.validate(formData, { abortEarly: false });

      const { email, password } = formData;

      // Retrieve existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Check if user exists and the password matches
      const user = existingUsers.find((user) => user.email === email && user.password === password);

      if (user) {
        // If user is found, notify success and redirect to the home page
        const secretKey = "your-secret-key";
        const token = await new SignJWT({ email })
                .setProtectedHeader({ alg: "HS256" })
                .sign(new TextEncoder().encode(secretKey));
        
        // Store the token in localStorage
        localStorage.setItem("authToken", token);
        toast.success("Login successful!");
        navigate("/"); // Redirect to home
      } else {
        // If user is not found or password doesn't match, show error
        toast.error("Invalid email or password!");
      }
    } catch (error) {
      const newErrors = {};

      // Handle validation error messages
      error.inner.map((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/signup"); // Redirect to signup page
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
      <Box
        sx={{
          maxWidth: 400,
          mx: "auto",
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom sx={{ marginTop: 1 }}>
          Login
        </Typography>

        {/* Step 5: Email Input */}
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

        {/* Step 6: Password Input */}
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

        {/* Step 8: Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Button onClick={handleLoginRedirect} color="primary" sx={{ p: 0 }}>
              Signup
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
