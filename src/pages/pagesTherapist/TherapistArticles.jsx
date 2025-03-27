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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

// This component allows therapists to perform CRUD operations on articles.
// Mock data is used; replace with API calls when ready.
const TherapistArticles = () => {
  const navigate = useNavigate();

  // Mock data for articles
  const initialArticles = [
    {
      id: 1,
      title: "5 Tips for Better Communication",
      content: "Effective communication is key to a healthy relationship. Here are five tips to improve how you and your partner talk to each other...",
      lastUpdated: "2025-03-27",
    },
    {
      id: 2,
      title: "Managing Conflict in Relationships",
      content: "Conflict is inevitable, but it doesn’t have to harm your relationship. Learn strategies to resolve disagreements constructively...",
      lastUpdated: "2025-03-26",
    },
  ];

  const [articles, setArticles] = useState(initialArticles);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [newArticle, setNewArticle] = useState({ title: "", content: "" });

  useEffect(() => {
    // Simulate fetching articles
    // TODO: Replace with API call, e.g.:
    // const fetchArticles = async () => {
    //   const therapistId = getLoggedInTherapistId();
    //   const data = await fetchTherapistArticles(therapistId);
    //   setArticles(data);
    // };
  }, []);

  // Handle Add Article
  const handleAddArticle = () => {
    if (!newArticle.title || !newArticle.content) {
      alert("Please fill in all fields.");
      return;
    }
    const newId = articles.length > 0 ? Math.max(...articles.map((a) => a.id)) + 1 : 1;
    const article = {
      id: newId,
      title: newArticle.title,
      content: newArticle.content,
      lastUpdated: new Date().toISOString().split("T")[0], // e.g., "2025-03-27"
    };
    setArticles([...articles, article]);
    setNewArticle({ title: "", content: "" });
    setOpenAddDialog(false);
    // TODO: Replace with API call, e.g., createArticle(article);
  };

  // Handle Edit Article
  const handleEditArticle = (article) => {
    setCurrentArticle(article);
    setOpenEditDialog(true);
  };

  const handleUpdateArticle = () => {
    if (!currentArticle.title || !currentArticle.content) {
      alert("Please fill in all fields.");
      return;
    }
    const updatedArticles = articles.map((a) =>
      a.id === currentArticle.id
        ? { ...currentArticle, lastUpdated: new Date().toISOString().split("T")[0] }
        : a
    );
    setArticles(updatedArticles);
    setOpenEditDialog(false);
    setCurrentArticle(null);
    // TODO: Replace with API call, e.g., updateArticle(currentArticle);
  };

  // Handle Delete Article
  const handleDeleteArticle = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      const updatedArticles = articles.filter((a) => a.id !== id);
      setArticles(updatedArticles);
      // TODO: Replace with API call, e.g., deleteArticle(id);
    }
  };

  // Get content snippet (first 50 characters)
  const getContentSnippet = (content) => {
    return content.length > 50 ? content.substring(0, 50) + "..." : content;
  };

  return (
    <Box sx={{ marginLeft: "250px", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        My Articles
      </Typography>

      {/* Add Article Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAddDialog(true)}
        sx={{ marginBottom: "20px" }}
      >
        Add New Article
      </Button>

      {/* Articles Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Content (Snippet)</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.length > 0 ? (
              articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>{getContentSnippet(article.content)}</TableCell>
                  <TableCell>{article.lastUpdated}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditArticle(article)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteArticle(article.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No articles found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Article Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Article</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={newArticle.title}
            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
            sx={{ marginBottom: "20px", marginTop: "10px" }}
          />
          <TextField
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={newArticle.content}
            onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddArticle} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Article Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Article</DialogTitle>
        <DialogContent>
          {currentArticle && (
            <>
              <TextField
                label="Title"
                fullWidth
                value={currentArticle.title}
                onChange={(e) =>
                  setCurrentArticle({ ...currentArticle, title: e.target.value })
                }
                sx={{ marginBottom: "20px", marginTop: "10px" }}
              />
              <TextField
                label="Content"
                fullWidth
                multiline
                rows={4}
                value={currentArticle.content}
                onChange={(e) =>
                  setCurrentArticle({ ...currentArticle, content: e.target.value })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateArticle} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TherapistArticles;