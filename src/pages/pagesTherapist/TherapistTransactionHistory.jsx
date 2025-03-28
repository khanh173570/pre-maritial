import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

// This component displays the therapist's transaction history with filtering and sorting.
// Replace mock data with API calls when ready.
const TherapistTransactionHistory = () => {
  const navigate = useNavigate();

  const mockTransactions = [
    {
      id: 1,
      type: "Session Payment",
      amount: 50.00,
      date: "2025-03-27",
      status: "Completed",
      details: "Client: John Doe, Session on 2025-03-27 at 10:00 AM",
    },
    {
      id: 2,
      type: "Session Payment",
      amount: 75.00,
      date: "2025-03-26",
      status: "Completed",
      details: "Client: Jane Smith, Session on 2025-03-26 at 2:00 PM",
    },
    {
      id: 3,
      type: "Withdrawal",
      amount: -100.00,
      date: "2025-03-25",
      status: "Completed",
      details: "Withdrawn to bank account",
    },
    {
      id: 4,
      type: "Refund",
      amount: -60.00,
      date: "2025-03-24",
      status: "Approved",
      details: "Client: Mike Johnson, Reason: Client canceled last minute",
    },
  ];

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    // Simulate fetching transactions
    // TODO: Replace with API call, e.g.:
    // fetch("http://54.179.45.72:8080/therapistTransactions?therapistId={id}")
    //   .then(res => res.json())
    //   .then(data => setTransactions(data));
    setTransactions(mockTransactions);
  }, []);

  useEffect(() => {
    let updatedTransactions = [...transactions];
    if (filterType !== "All") {
      updatedTransactions = updatedTransactions.filter(
        (t) => t.type === filterType
      );
    }
    updatedTransactions.sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
    setFilteredTransactions(updatedTransactions);
  }, [transactions, filterType, sortOrder]);

  const handleSort = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  return (
    <Box sx={{ marginLeft: "250px", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Transaction History
      </Typography>

      <FormControl sx={{ minWidth: 200, marginBottom: "20px" }}>
        <InputLabel>Filter by Type</InputLabel>
        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          label="Filter by Type"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Session Payment">Session Payment</MenuItem>
          <MenuItem value="Withdrawal">Withdrawal</MenuItem>
          <MenuItem value="Refund">Refund</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        onClick={handleSort}
        sx={{ marginBottom: "20px", marginLeft: "20px" }}
      >
        Sort by Date ({sortOrder === "desc" ? "Newest First" : "Oldest First"})
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>
                  {transaction.amount > 0 ? "+" : ""}${transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>{transaction.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TherapistTransactionHistory;