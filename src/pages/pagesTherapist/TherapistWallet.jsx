import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText, Button, TextField, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { toast } from "react-toastify";

// TherapistWallet.jsx
// This component displays the therapist's wallet, including their current balance and transaction history.
// It also allows the therapist to request a withdrawal of their earnings.
// Currently, it uses mock data (mockBalance and mockTransactions) to simulate the wallet data that would normally come from the API.
// The withdrawal functionality is also mocked by updating the local state.
// TODO: For the development team
// 1. Replace the mock data with real API calls to fetch the wallet balance and transaction history.
//    - Endpoint for balance: GET /therapists/{id}/wallet/balance (or similar, check Swagger UI).
//    - Endpoint for transactions: GET /therapists/{id}/wallet/transactions (or similar).
//    - Expected response: See mockBalance and mockTransactions for the structure.
// 2. Implement the withdrawal request functionality with an API call.
//    - Endpoint: POST /therapists/{id}/wallet/withdraw (or similar).
//    - Request body: { amount: number }
// See the TODO comments in the code for detailed instructions.

const TherapistWallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // Mock data to simulate the wallet balance and transactions
  const mockBalance = 150.00; // Starting balance in USD

  const mockTransactions = [
    {
      id: 1,
      type: "Session Payment",
      amount: 50.00,
      date: "2025-03-27",
      status: "Completed",
    },
    {
      id: 2,
      type: "Session Payment",
      amount: 75.00,
      date: "2025-03-26",
      status: "Completed",
    },
    {
      id: 3,
      type: "Withdrawal",
      amount: -100.00,
      date: "2025-03-25",
      status: "Completed",
    },
  ];

  // Simulate fetching wallet data on mount
  useEffect(() => {
    // TODO: For the development team
    // Replace this mock data with API calls to fetch the wallet balance and transactions
    // Example:
    /*
    const fetchWalletData = async () => {
      try {
        const token = localStorage.getItem("token");
        const therapistId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;
        if (!therapistId) throw new Error("Therapist ID not found");

        // Fetch balance
        const balanceResponse = await fetch(`http://54.179.45.72:8080/therapists/${therapistId}/wallet/balance`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!balanceResponse.ok) throw new Error("Failed to fetch balance");
        const balanceData = await balanceResponse.json();
        setBalance(balanceData.balance);

        // Fetch transactions
        const transactionsResponse = await fetch(`http://54.179.45.72:8080/therapists/${therapistId}/wallet/transactions`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!transactionsResponse.ok) throw new Error("Failed to fetch transactions");
        const transactionsData = await transactionsResponse.json();
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        toast.error("Failed to load wallet data. Please try again.");
      }
    };
    fetchWalletData();
    */

    // For now, use mock data
    setBalance(mockBalance);
    setTransactions(mockTransactions);
  }, []);

  // Handle opening and closing the withdrawal dialog
  const handleOpenWithdrawDialog = () => {
    setOpenWithdrawDialog(true);
  };

  const handleCloseWithdrawDialog = () => {
    setOpenWithdrawDialog(false);
    setWithdrawAmount("");
  };

  // Handle withdrawal request
  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    
    // Validate the withdrawal amount
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount greater than 0.");
      return;
    }

    if (amount > balance) {
      toast.error("Withdrawal amount cannot exceed your current balance.");
      return;
    }

    // TODO: For the development team
    // Replace this mock logic with an API call to request a withdrawal
    // Example:
    /*
    const requestWithdrawal = async () => {
      try {
        const token = localStorage.getItem("token");
        const therapistId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;
        if (!therapistId) throw new Error("Therapist ID not found");

        const response = await fetch(`http://54.179.45.72:8080/therapists/${therapistId}/wallet/withdraw`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount }),
        });
        if (!response.ok) throw new Error("Failed to request withdrawal");
        const data = await response.json();
        return data; // Expect the new transaction or updated balance
      } catch (error) {
        console.error("Error requesting withdrawal:", error);
        toast.error("Failed to request withdrawal. Please try again.");
        return null;
      }
    };
    const withdrawalResult = await requestWithdrawal();
    if (!withdrawalResult) return;
    */

    // Simulate the withdrawal by updating the local state
    const newBalance = balance - amount;
    const newTransaction = {
      id: transactions.length + 1,
      type: "Withdrawal",
      amount: -amount,
      date: "2025-03-27", // Current date for mock purposes
      status: "Pending", // Simulate a pending withdrawal
    };

    setBalance(newBalance);
    setTransactions([newTransaction, ...transactions]);
    setOpenWithdrawDialog(false);
    setWithdrawAmount("");
    toast.success(`Withdrawal request for $${amount.toFixed(2)} submitted successfully!`);
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 800, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Wallet
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Current Balance: ${balance.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenWithdrawDialog}
          disabled={balance <= 0}
        >
          Request Withdrawal
        </Button>
      </Paper>
      <Typography variant="h5" gutterBottom>
        Transaction History
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        {transactions.length === 0 ? (
          <Typography>No transactions available.</Typography>
        ) : (
          <List>
            {transactions.map((transaction, index) => (
              <React.Fragment key={transaction.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1">
                        {transaction.type} - {transaction.status}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2">
                          Amount: {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                        </Typography>
                        <Typography variant="body2">
                          Date: {transaction.date}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < transactions.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>

      {/* Withdrawal Dialog */}
      <Dialog open={openWithdrawDialog} onClose={handleCloseWithdrawDialog}>
        <DialogTitle>Request Withdrawal</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Current Balance: ${balance.toFixed(2)}
          </Typography>
          <TextField
            label="Amount to Withdraw"
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            fullWidth
            margin="normal"
            inputProps={{ min: 0, step: "0.01" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWithdrawDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleWithdraw} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TherapistWallet;