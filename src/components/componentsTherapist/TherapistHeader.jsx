import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"; // Add this import
import useAuth from "../../utils/hook/useAuth";

// TherapistHeader.jsx
// This component displays the header for the therapist dashboard.
// It includes links to the notifications and wallet pages, with a badge showing the number of unread notifications.
// Currently, the unread count is mocked (hardcoded to 2 for testing).
// TODO: For the development team
// 1. Replace the hardcoded unreadCount with a real value.
//    - Option 1: Fetch the unread count from the API (e.g., GET /notifications/unread-count).
//    - Option 2: Use a context or state management to share the unreadCount from TherapistNotifications.jsx.
// 2. If using a context, you can store the notifications in a NotificationContext and update the unreadCount dynamically.

const TherapistHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/therapist-home/profile");
    handleClose();
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const handleNotifications = () => {
    navigate("/therapist-home/notifications");
  };

  const handleWallet = () => {
    navigate("/therapist-home/wallet");
  };

  // Mock unread count for testing
  const unreadCount = 2; // This will be updated dynamically by your team

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Therapist Dashboard
        </Typography>
        <IconButton color="inherit" onClick={handleWallet}>
          <AccountBalanceWalletIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleNotifications}>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TherapistHeader;