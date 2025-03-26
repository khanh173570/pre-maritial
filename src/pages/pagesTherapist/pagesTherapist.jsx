import React from "react";
import { Box, Typography } from "@mui/material";
import useAuth from "../../utils/hook/useAuth";

const PagesTherapist = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Chào mừng, {user?.username}!
      </Typography>
      <Typography variant="h6">Therapist Dashboard</Typography>
      <Typography>Overview of your bookings, notifications, and more coming soon!</Typography>
    </Box>
  );
};

export default PagesTherapist;