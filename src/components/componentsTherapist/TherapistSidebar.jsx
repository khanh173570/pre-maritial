import React from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import QuizIcon from "@mui/icons-material/Quiz";

const TherapistSidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "#f5f5f5",
        position: "fixed",
        top: 0,
        left: 0,
        paddingTop: 8,
      }}
    >
      <List>
        <ListItem button component={Link} to="/therapist-home/profile">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/therapist-home/wallet">
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="Wallet" />
        </ListItem>
        <ListItem button component={Link} to="/therapist-home/schedule">
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Schedule/Booking" />
        </ListItem>
        <ListItem button component={Link} to="/therapist-home/quiz">
          <ListItemIcon>
            <QuizIcon />
          </ListItemIcon>
          <ListItemText primary="Quiz" />
        </ListItem>
      </List>
    </Box>
  );
};

export default TherapistSidebar;