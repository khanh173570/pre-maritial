import React from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"; // Add HomeIcon for the "Home" link
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import QuizIcon from "@mui/icons-material/Quiz";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import HistoryIcon from "@mui/icons-material/History";
import ArticleIcon from "@mui/icons-material/Article";

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
        {/* Home Link */}
        <ListItem
          button={true}
          component={Link}
          to="/therapist-home"
          sx={{
            "&:hover": {
              backgroundColor: "#bbdefb", // Match the hover effect from the header
            },
          }}
        >
          <ListItemIcon>
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: "#e3f2fd", // Light blue background
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <HomeIcon sx={{ color: "#1976d2" }} />
            </Box>
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                sx={{
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
              >
                Home
              </Typography>
            }
          />
        </ListItem>

        {/* Profile */}
        <ListItem button={true} component={Link} to="/therapist-home/profile">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        {/* Notifications */}
        <ListItem button={true} component={Link} to="/therapist-home/notifications">
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>

        {/* Wallet */}
        <ListItem button={true} component={Link} to="/therapist-home/wallet">
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="Wallet" />
        </ListItem>

        {/* Withdrawn Requests */}
        <ListItem button={true} component={Link} to="/therapist-home/withdrawn-requests">
          <ListItemIcon>
            <RequestQuoteIcon />
          </ListItemIcon>
          <ListItemText primary="Withdrawn Requests" />
        </ListItem>

        {/* Transaction History */}
        <ListItem button={true} component={Link} to="/therapist-home/transaction-history">
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Transaction History" />
        </ListItem>

        {/* Schedule/Booking */}
        <ListItem button={true} component={Link} to="/therapist-home/schedule">
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Schedule/Booking" />
        </ListItem>

        {/* Quiz */}
        <ListItem button={true} component={Link} to="/therapist-home/quiz">
          <ListItemIcon>
            <QuizIcon />
          </ListItemIcon>
          <ListItemText primary="Quiz" />
        </ListItem>

        {/* Articles */}
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