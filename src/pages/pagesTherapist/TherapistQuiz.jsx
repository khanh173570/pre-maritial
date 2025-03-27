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
} from "@mui/material";

// This component displays the therapist's quizzes.
// Replace mock data with API calls (e.g., fetchTherapistQuizzes) when ready.
const TherapistQuiz = () => {
  const navigate = useNavigate();

  // Mock data for quizzes
  const mockQuizzes = [
    {
      id: 1,
      title: "Communication Basics",
      description: "Assess how well couples communicate under stress.",
      status: "Active",
    },
    {
      id: 2,
      title: "Conflict Resolution",
      description: "Evaluate strategies for resolving disagreements.",
      status: "Draft",
    },
    {
      id: 3,
      title: "Financial Planning",
      description: "Explore attitudes toward money and budgeting.",
      status: "Active",
    },
  ];

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Simulate fetching quizzes
    // TODO: Replace with real API call, e.g.:
    // const fetchQuizzes = async () => {
    //   const therapistId = getLoggedInTherapistId();
    //   await fetchTherapistQuizzes(therapistId);
    //   setQuizzes(therapistQuizzesFromContext);
    // };
    setQuizzes(mockQuizzes);
  }, []);

  return (
    <Box sx={{ marginLeft: "250px", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        My Quizzes
      </Typography>

      {/* Quizzes Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell>{quiz.title}</TableCell>
                  <TableCell>{quiz.description}</TableCell>
                  <TableCell>{quiz.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No quizzes found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TherapistQuiz;