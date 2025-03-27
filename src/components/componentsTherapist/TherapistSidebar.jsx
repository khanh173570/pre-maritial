import React from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import QuizIcon from "@mui/icons-material/Quiz";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import HistoryIcon from "@mui/icons-material/History";
import ArticleIcon from "@mui/icons-material/Article"; // Add this for Articles

// TherapistSidebar.jsx
// This component provides a sidebar navigation for the therapist dashboard.
// Updated to include Articles link.

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
        <ListItem button={true} component={Link} to="/therapist-home/profile">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button={true} component={Link} to="/therapist-home/notifications">
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button={true} component={Link} to="/therapist-home/wallet">
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="Wallet" />
        </ListItem>
        <ListItem button={true} component={Link} to="/therapist-home/withdrawn-requests">
          <ListItemIcon>
            <RequestQuoteIcon />
          </ListItemIcon>
          <ListItemText primary="Withdrawn Requests" />
        </ListItem>
        <ListItem button={true} component={Link} to="/therapist-home/transaction-history">
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Transaction History" />
        </ListItem>
        <ListItem button={true} component={Link} to="/therapist-home/schedule">
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Schedule/Booking" />
        </ListItem>
        <ListItem button={true} component={Link} to="/therapist-home/quiz">
          <ListItemIcon>
            <QuizIcon />
          </ListItemIcon>
          <ListItemText primary="Quiz" />
        </ListItem>
        <ListItem button={true} component={Link} to="/therapist-home/articles">
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary="Articles" />
        </ListItem>
      </List>
    </Box>
  );
};

export default TherapistSidebar;