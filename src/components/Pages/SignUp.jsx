import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, clearError } from "../Store/slices/authSlice";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Alert,
  IconButton,
  InputAdornment,
  LinearProgress,
  CircularProgress,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState({ label: "", value: 0 });

  // ✅ AUTO CLEAR ERROR AFTER 3 SECONDS
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // 🔐 Password strength checker
  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[@$!%*?&]/.test(password)) score += 25;

    if (score <= 25) return { label: "Weak", value: 25 };
    if (score <= 75) return { label: "Medium", value: 60 };
    return { label: "Strong", value: 100 };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "password") {
      setStrength(checkPasswordStrength(value));
    }
  };

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
    } else if (!nameRegex.test(formData.firstname.trim())) {
      newErrors.firstname = "Only alphabets allowed";
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    } else if (!nameRegex.test(formData.lastname.trim())) {
      newErrors.lastname = "Only alphabets allowed";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Min 8 chars, uppercase, number & special character required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMIT CLICKED");

    dispatch(clearError());
    if (!validate()) return;

    const payload = {
      firstName: formData.firstname.trim(),
      lastName: formData.lastname.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    try {
      const result = await dispatch(signupUser(payload));

      // ✅ Redirect to home page if signup successful
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      sx={{ minHeight: "100vh", backgroundColor: "#dfe8f0ff" }}
    >
      <Card sx={{ maxWidth: 450, width: "100%", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} textAlign="center">
            Create Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="First Name"
              name="firstname"
              fullWidth
              margin="normal"
              value={formData.firstname}
              onChange={handleChange}
              error={!!errors.firstname}
              helperText={errors.firstname}
            />

            <TextField
              label="Last Name"
              name="lastname"
              fullWidth
              margin="normal"
              value={formData.lastname}
              onChange={handleChange}
              error={!!errors.lastname}
              helperText={errors.lastname}
            />

            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {formData.password && (
              <Box mt={1}>
                <LinearProgress variant="determinate" value={strength.value} />
                <Typography variant="caption">
                  Strength: {strength.label}
                </Typography>
              </Box>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={22} /> : "Sign Up"}
            </Button>
          </form>

          <Typography textAlign="center" mt={2}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1976d2" }}>
              Sign In
            </Link>
          </Typography>

          <Box textAlign="center" mt={2}>
            <Link to="/" style={{ color: "#1976d2", textDecoration: "none" }}>
              ← Back to Home
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
