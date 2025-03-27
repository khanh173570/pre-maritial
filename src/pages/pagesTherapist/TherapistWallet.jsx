import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import useAuth from "../../utils/hook/useAuth";

const TherapistWallet = () => {
  const { user } = useAuth();

  // Hardcoded balance for now; we'll fetch the real balance via API later
  const currentBalance = 100.00;

  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Chào mừng, {user?.username}!
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
        <Typography variant="h5" gutterBottom>
          Wallet
        </Typography>
        <Typography variant="h6">
          Current Balance: ${currentBalance.toFixed(2)}
        </Typography>
      </Paper>
    </Box>
  );
};

export default TherapistWallet;