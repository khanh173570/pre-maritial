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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

// This component displays the therapist's bookings (past and upcoming).
// Replace mock data with API calls using TherapistContext's fetchTherapistSchedules when ready.
const TherapistBookings = () => {
  const navigate = useNavigate();

  // Mock data for bookings
  const mockBookings = [
    {
      id: 1,
      clientName: "John Doe",
      dateTime: "2025-03-28T10:00:00",
      status: "Scheduled",
    },
    {
      id: 2,
      clientName: "Jane Smith",
      dateTime: "2025-03-26T14:00:00",
      status: "Completed",
    },
    {
      id: 3,
      clientName: "Mike Johnson",
      dateTime: "2025-03-25T09:00:00",
      status: "Canceled",
    },
    {
      id: 4,
      clientName: "Sarah Lee",
      dateTime: "2025-03-29T15:00:00",
      status: "Scheduled",
    },
  ];

  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    // Simulate fetching bookings
    // TODO: Replace with real API call, e.g.:
    // const fetchBookings = async () => {
    //   const therapistId = getLoggedInTherapistId();
    //   await fetchTherapistSchedules(therapistId);
    //   setBookings(therapistSchedulesFromContext);
    // };
    setBookings(mockBookings);
  }, []);

  // Filter bookings based on status
  const filteredBookings =
    filterStatus === "All"
      ? bookings
      : bookings.filter((booking) => booking.status === filterStatus);

  // Format date and time
  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <Box sx={{ marginLeft: "250px", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        My Schedule
      </Typography>

      {/* Filter by Status */}
      <FormControl sx={{ minWidth: 200, marginBottom: "20px" }}>
        <InputLabel>Filter by Status</InputLabel>
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          label="Filter by Status"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Scheduled">Scheduled</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Canceled">Canceled</MenuItem>
        </Select>
      </FormControl>

      {/* Bookings Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.clientName}</TableCell>
                  <TableCell>{formatDateTime(booking.dateTime)}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No bookings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TherapistBookings;