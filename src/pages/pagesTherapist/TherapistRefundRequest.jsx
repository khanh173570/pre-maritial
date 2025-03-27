import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import useAuth from "../../utils/hook/useAuth";

const TherapistRefundRequest = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Chào mừng, {user?.username}!
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
        <Typography variant="h5" gutterBottom>
          Refund Request
        </Typography>
        <Typography>
          This page will allow you to request a withdrawal from your on-site wallet to your bank account. Coming soon!
        </Typography>
      </Paper>
    </Box>
  );
};

export default TherapistRefundRequest;