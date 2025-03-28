import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText, Button, TextField, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { toast } from "react-toastify";

// TherapistWithdrawnRequests.jsx
// This component allows therapists to request withdrawals from the site's wallet to their personal bank account.
// It displays the current wallet balance and a history of withdrawal requests.
// Currently, it uses mock data (mockBalance and mockWithdrawnRequests) to simulate the wallet balance and withdrawal requests that would normally come from the API.
// The withdrawal request functionality is also mocked by updating the local state.
// Note: The wallet balance is not deducted here; the deduction should happen on the admin side after approval.
// TODO: For the development team
// 1. Replace the mock data with real API calls to fetch the wallet balance and withdrawal request history.
//    - Endpoint for balance: GET /therapists/{id}/wallet/balance (or similar, check Swagger UI).
//    - Endpoint for withdrawal requests: GET /therapists/{id}/withdrawn-requests (or similar).
//    - Expected response: See mockBalance and mockWithdrawnRequests for the structure.
// 2. Implement the withdrawal request submission with an API call.
//    - Endpoint: POST /therapists/{id}/withdrawn-requests (or similar).
//    - Request body: { amount: number, bankAccountDetails: { accountNumber: string, bankName: string }, reason: string }
// See the TODO comments in the code for detailed instructions.

const TherapistWithdrawnRequests = () => {
  const [balance, setBalance] = useState(0);
  const [withdrawnRequests, setWithdrawnRequests] = useState([]);
  const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [bankAccountDetails, setBankAccountDetails] = useState({ accountNumber: "", bankName: "" });
  const [withdrawReason, setWithdrawReason] = useState("");

  // Mock data to simulate wallet balance and withdrawal requests
  const mockBalance = 150.00; // Consistent with TherapistWallet

  const mockWithdrawnRequests = [
    {
      id: 1,
      amount: 100.00,
      bankAccountDetails: { accountNumber: "1234567890", bankName: "Sample Bank" },
      reason: "Need funds for personal expenses",
      status: "Pending",
      requestDate: "2025-03-26",
    },
  ];

  // Simulate fetching wallet balance and withdrawal requests on mount
  useEffect(() => {
    // TODO: For the development team
    // Replace this mock data with API calls to fetch the wallet balance and withdrawal requests
    // Example:
    /*
    const fetchWithdrawData = async () => {
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

        // Fetch withdrawal requests
        const withdrawnRequestsResponse = await fetch(`http://54.179.45.72:8080/therapists/${therapistId}/withdrawn-requests`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!withdrawnRequestsResponse.ok) throw new Error("Failed to fetch withdrawal requests");
        const withdrawnRequestsData = await withdrawnRequestsResponse.json();
        setWithdrawnRequests(withdrawnRequestsData);
      } catch (error) {
        console.error("Error fetching withdraw data:", error);
        toast.error("Failed to load withdraw data. Please try again.");
      }
    };
    fetchWithdrawData();
    */

    // For now, use mock data
    setBalance(mockBalance);
    setWithdrawnRequests(mockWithdrawnRequests);
  }, []);

  // Handle opening and closing the withdrawal request dialog
  const handleOpenWithdrawDialog = () => {
    setOpenWithdrawDialog(true);
  };

  const handleCloseWithdrawDialog = () => {
    setOpenWithdrawDialog(false);
    setWithdrawAmount("");
    setBankAccountDetails({ accountNumber: "", bankName: "" });
    setWithdrawReason("");
  };

  // Handle submitting a withdrawal request
  const handleSubmitWithdrawRequest = () => {
    const amount = parseFloat(withdrawAmount);

    // Validate the withdrawal request
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount greater than 0.");
      return;
    }

    if (amount > balance) {
      toast.error("Withdrawal amount cannot exceed your current balance.");
      return;
    }

    if (!bankAccountDetails.accountNumber.trim() || !bankAccountDetails.bankName.trim()) {
      toast.error("Please provide complete bank account details.");
      return;
    }

    if (!withdrawReason.trim()) {
      toast.error("Please provide a reason for the withdrawal.");
      return;
    }

    // TODO: For the development team
    // Replace this mock logic with an API call to submit a withdrawal request
    // Example:
    /*
    const submitWithdrawRequest = async () => {
      try {
        const token = localStorage.getItem("token");
        const therapistId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;
        if (!therapistId) throw new Error("Therapist ID not found");

        const response = await fetch(`http://54.179.45.72:8080/therapists/${therapistId}/withdrawn-requests`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount,
            bankAccountDetails,
            reason: withdrawReason,
          }),
        });
        if (!response.ok) throw new Error("Failed to submit withdrawal request");
        const data = await response.json();
        return data; // Expect the new withdrawal request object
      } catch (error) {
        console.error("Error submitting withdrawal request:", error);
        toast.error("Failed to submit withdrawal request. Please try again.");
        return null;
      }
    };
    const withdrawRequestResult = await submitWithdrawRequest();
    if (!withdrawRequestResult) return;
    */

    // Simulate the withdrawal request by updating the local state
    const newWithdrawRequest = {
      id: withdrawnRequests.length + 1,
      amount,
      bankAccountDetails,
      reason: withdrawReason,
      status: "Pending",
      requestDate: "2025-03-27", // Current date for mock purposes
    };

    setWithdrawnRequests([newWithdrawRequest, ...withdrawnRequests]);
    handleCloseWithdrawDialog();
    toast.success(`Withdrawal request for $${amount.toFixed(2)} submitted successfully!`);
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 800, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Withdrawn Requests
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
        Withdrawal Request History
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        {withdrawnRequests.length === 0 ? (
          <Typography>No withdrawal requests submitted.</Typography>
        ) : (
          <List>
            {withdrawnRequests.map((request, index) => (
              <React.Fragment key={request.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1">
                        Amount: ${request.amount.toFixed(2)} - {request.status}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2">
                          Bank Account: {request.bankAccountDetails.accountNumber} ({request.bankAccountDetails.bankName})
                        </Typography>
                        <Typography variant="body2">
                          Reason: {request.reason}
                        </Typography>
                        <Typography variant="body2">
                          Requested on: {request.requestDate}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < withdrawnRequests.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>

      {/* Withdrawal Request Dialog */}
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
            required
          />
          <TextField
            label="Bank Account Number"
            value={bankAccountDetails.accountNumber}
            onChange={(e) => setBankAccountDetails({ ...bankAccountDetails, accountNumber: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Bank Name"
            value={bankAccountDetails.bankName}
            onChange={(e) => setBankAccountDetails({ ...bankAccountDetails, bankName: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Reason for Withdrawal"
            value={withdrawReason}
            onChange={(e) => setWithdrawReason(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWithdrawDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitWithdrawRequest} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TherapistWithdrawnRequests;