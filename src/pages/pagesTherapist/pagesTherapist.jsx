import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import QuizIcon from "@mui/icons-material/Quiz";
import ArticleIcon from "@mui/icons-material/Article";
import useAuth from "../../utils/hook/useAuth";

// This component serves as the homepage for the Therapist Role.
// It provides a warm welcome and easy access to key features.
const PagesTherapist = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ marginLeft: "250px", padding: "40px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Welcome Section */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#1976d2", fontWeight: "bold" }}
      >
        Welcome Back, {user?.username || "Therapist"}!
      </Typography>
      <Typography variant="h6" sx={{ color: "#555", marginBottom: "40px" }}>
        Let’s help couples thrive today.
      </Typography>

      {/* Feature Highlights */}
      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <PersonIcon sx={{ marginRight: "10px", color: "#1976d2" }} />
              <Box>
                <Typography variant="h6">Your Profile</Typography>
                <Typography variant="body2" color="text.secondary">
                  View and update your personal details.
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={Link}
                to="/therapist-home/profile"
                color="primary"
              >
                Go to Profile
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Notifications Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <NotificationsIcon sx={{ marginRight: "10px", color: "#1976d2" }} />
              <Box>
                <Typography variant="h6">Notifications</Typography>
                <Typography variant="body2" color="text.secondary">
                  Check your latest updates and messages.
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={Link}
                to="/therapist-home/notifications"
                color="primary"
              >
                View Notifications
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Wallet Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <AccountBalanceWalletIcon sx={{ marginRight: "10px", color: "#1976d2" }} />
              <Box>
                <Typography variant="h6">Wallet</Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your earnings and withdrawals.
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={Link}
                to="/therapist-home/wallet"
                color="primary"
              >
                Go to Wallet
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Schedule Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <CalendarTodayIcon sx={{ marginRight: "10px", color: "#1976d2" }} />
              <Box>
                <Typography variant="h6">Schedule</Typography>
                <Typography variant="body2" color="text.secondary">
                  View your upcoming sessions.
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={Link}
                to="/therapist-home/schedule"
                color="primary"
              >
                View Schedule
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Quiz Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <QuizIcon sx={{ marginRight: "10px", color: "#1976d2" }} />
              <Box>
                <Typography variant="h6">Quiz</Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage quizzes for couples.
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={Link}
                to="/therapist-home/quiz"
                color="primary"
              >
                Go to Quiz
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Articles Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <ArticleIcon sx={{ marginRight: "10px", color: "#1976d2" }} />
              <Box>
                <Typography variant="h6">Articles</Typography>
                <Typography variant="body2" color="text.secondary">
                  Create and manage your articles.
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={Link}
                to="/therapist-home/articles"
                color="primary"
              >
                Go to Articles
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PagesTherapist;