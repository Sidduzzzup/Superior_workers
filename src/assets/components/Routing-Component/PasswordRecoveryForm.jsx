import React, { useState, useCallback } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  LinearProgress,
  IconButton,
  Tooltip,
  Paper,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import zxcvbn from "zxcvbn";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "2rem",
  maxWidth: "500px",
  margin: "2rem auto",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const PasswordStrengthBar = styled(LinearProgress)(({ strength }) => ({
  height: "8px",
  borderRadius: "4px",
  marginTop: "8px",
  backgroundColor: "#e0e0e0",
  "& .MuiLinearProgress-bar": {
    backgroundColor:
      strength === 0
        ? "#f44336"
        : strength === 1
        ? "#ff9800"
        : strength === 2
        ? "#ffc107"
        : "#4caf50",
  },
}));

const PasswordRecoveryForm = () => {
  const { resetPassword } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { token } = useParams();
  const navigate = useNavigate();

  const calculatePasswordStrength = useCallback((password) => {
    if (!password) return 0;
    const result = zxcvbn(password);
    return result.score;
  }, []);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const getPasswordFeedback = (strength) => {
    switch (strength) {
      case 0:
        return "Very Weak - Add more characters and mix different types";
      case 1:
        return "Weak - Try adding numbers and special characters";
      case 2:
        return "Fair - Consider using a longer password";
      case 3:
        return "Strong - Good combination of characters";
      case 4:
        return "Very Strong - Excellent password!";
      default:
        return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (passwordStrength < 3) {
      newErrors.password = "Please choose a stronger password";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 3) {
      setErrors(newErrors);
      return;
    }

    try {
      await resetPassword(token, password);
      toast.success("Password reset successfully, redirecting to login page...");
      setTimeout(() => navigate("/FirstLogin"), 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <StyledPaper elevation={3}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <FaLock size={40} color="#1976d2" />
            <Typography variant="h5" component="h1" gutterBottom>
              Password Recovery
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            label="New Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              ),
            }}
          />

          <Box>
            <Tooltip title={getPasswordFeedback(passwordStrength)} arrow>
              <Box>
                <PasswordStrengthBar
                  variant="determinate"
                  value={(passwordStrength + 1) * 20}
                  strength={passwordStrength}
                />
              </Box>
            </Tooltip>
            <Typography variant="caption" color="textSecondary">
              {getPasswordFeedback(passwordStrength)}
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={
              !email || !password || !confirmPassword || Object.keys(errors).length > 0
            }
          >
            Reset Password
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default PasswordRecoveryForm;
