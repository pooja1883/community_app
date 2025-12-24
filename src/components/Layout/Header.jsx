import "@fontsource/pacifico";
import "@fontsource/lobster";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import GroupIcon from "@mui/icons-material/Group";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/slices/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Auth state
  const { token, user } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ backgroundColor: "#cd7474ff" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          
          {/* Left side logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <GroupIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontFamily: "Lobster, cursive",
                fontWeight: 400,
                letterSpacing: 2,
                fontSize: 20,
                py: 3,
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              CollabHub
            </Typography>
          </Box>

          {/* Right side */}
          {!token ? (
            // ✅ Logged out → Sign In
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                backgroundColor: "primary.main",
                color: "white",
                textTransform: "none",
                px: 3,
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          ) : (
            // ✅ Logged in → Avatar
            <><Avatar
  sx={{
    bgcolor: "primary.main",
    cursor: "pointer",
    width: 42,
    height: 42,
    fontWeight: 600,
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
    },
  }}
  onClick={handleAvatarClick}
>
  {user?.name?.[0]?.toUpperCase() || <PersonIcon />}
</Avatar>

<Menu
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  transformOrigin={{ vertical: "top", horizontal: "right" }}
  PaperProps={{
    sx: {
      mt: 1,
      minWidth: 220,
      borderRadius: "12px",
      boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
      overflow: "hidden",
    },
  }}
>
  {/* 👤 User Info */}
  <MenuItem disabled sx={{ opacity: 1, cursor: "default" }}>
    <Box>
      <Typography variant="subtitle2" fontWeight={600}>
        {user?.name || "User"}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ wordBreak: "break-all" }}
      >
        {user?.email || "Logged in"}
      </Typography>
    </Box>
  </MenuItem>

  <Divider />

  {/* 🚪 Logout */}
  <MenuItem
    onClick={handleLogout}
    sx={{
      color: "error.main",
      fontWeight: 500,
      gap: 1,
      "&:hover": {
        backgroundColor: "rgba(211, 47, 47, 0.08)",
      },
    }}
  >
    <LogoutIcon fontSize="small" />
    Logout
  </MenuItem>
</Menu>

            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
