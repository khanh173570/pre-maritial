import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../utils/hook/useAuth";
import { logout } from "../../contexts/AuthContext/reducer";
import { Box, Typography, Avatar, IconButton, Badge, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const TherapistHeader = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/therapist-home/profile");
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    if (dispatch) {
      dispatch(logout());
    }
    toast.success("Logout successful!");
    navigate("/login");
    handleMenuClose();
  };

  const handleNotificationsClick = () => {
    navigate("/therapist-home/notifications");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        backgroundColor: "#1976d2",
        color: "white",
      }}
    >
      <Typography variant="h6">Therapist Dashboard</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton onClick={handleNotificationsClick} sx={{ color: "white" }}>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            onClick={handleMenuOpen}
            sx={{ cursor: "pointer", bgcolor: "#fff", color: "#1976d2" }}
          >
            {user?.username?.charAt(0) || "U"}
          </Avatar>
          <Box>
            <Typography variant="body1">{user?.username || "User"}</Typography>
            <Typography variant="body2">{user?.email || "email@example.com"}</Typography>
            <Typography variant="body2">Wallet: $0.00</Typography>
          </Box>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default TherapistHeader;