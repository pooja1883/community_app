import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../Store/slices/authSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f7fa",
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}>
        <CardContent>
          <Box textAlign="center" mb={3}>
            <LogoutIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h5" fontWeight={700} mt={1}>
              Sign Out
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Are you sure you want to sign out?
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ borderRadius: "30px", py: 1 }}
            onClick={handleLogout}
          >
            Sign Out
          </Button>

          <Box textAlign="center" mt={2}>
            <Link to="/" style={{ color: "#1976d2", textDecoration: "none" }}>
              ← Cancel & Go Home
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
