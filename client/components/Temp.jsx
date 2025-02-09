import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import * as Yup from "yup";

function Temp() {
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
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Form Submitted", formData);
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
    <Typography variant="h4" align="center" color="textPrimary" gutterBottom sx={{marginTop: 3}}>
        Sign Up
      </Typography>
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      

      {/* Step 4: Name Input */}
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

      {/* Step 7: Confirm Password Input */}
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
    </Box>
    </Box>
  );
}

export default Temp;
