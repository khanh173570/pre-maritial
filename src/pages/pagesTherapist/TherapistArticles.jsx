import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

// This component allows therapists to view articles in a card-based preview layout and perform CRUD operations.
// Mock data is used; replace with API calls when ready.
const TherapistArticles = () => {
  const navigate = useNavigate();

  // Mock data for articles (added image field)
  const initialArticles = [
    {
      id: 1,
      title: "5 Tips for Better Communication",
      content: "Effective communication is key to a healthy relationship. Here are five tips to improve how you and your partner talk to each other. Start by actively listening, ensuring you understand your partner's perspective before responding. Next, use 'I' statements to express your feelings without blaming. Third, set aside time for meaningful conversations without distractions. Fourth, be mindful of your tone and body language, as they can impact how your message is received. Finally, practice patience and empathy, recognizing that communication is a skill that takes time to develop.",
      lastUpdated: "2025-03-27",
      image: "https://via.placeholder.com/300x200?text=Communication", // Placeholder image
    },
    {
      id: 2,
      title: "Managing Conflict in Relationships",
      content: "Conflict is inevitable, but it doesn’t have to harm your relationship. Learn strategies to resolve disagreements constructively. Begin by taking a step back to cool off if emotions run high. Then, approach the conversation with a problem-solving mindset, focusing on the issue rather than personal attacks. Listen to your partner’s perspective without interrupting, and validate their feelings even if you disagree. Work together to find a compromise that respects both of your needs. Finally, reflect on the conflict to identify patterns and prevent future issues.",
      lastUpdated: "2025-03-26",
      image: "https://via.placeholder.com/300x200?text=Conflict", // Placeholder image
    },
  ];

  const [articles, setArticles] = useState(initialArticles);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [newArticle, setNewArticle] = useState({ title: "", content: "", image: "" });

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
      image: newArticle.image || "https://via.placeholder.com/300x200?text=Article", // Default image if none provided
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setArticles([...articles, article]);
    setNewArticle({ title: "", content: "", image: "" });
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

  // Get content excerpt (first 100 characters)
  const getContentExcerpt = (content) => {
    return content.length > 100 ? content.substring(0, 100) + "..." : content;
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

      {/* Articles Grid (Card Layout) */}
      <Grid container spacing={3}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={article.image}
                  alt={article.title}
                />
                <CardContent>
                  <Typography variant="h6" component={Link} to={`/therapist-home/articles/${article.id}`} sx={{ textDecoration: "none", color: "inherit" }}>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getContentExcerpt(article.content)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Last Updated: {article.lastUpdated}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleEditArticle(article)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteArticle(article.id)}>
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No articles found</Typography>
        )}
      </Grid>

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
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            label="Image URL (optional)"
            fullWidth
            value={newArticle.image}
            onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
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
                sx={{ marginBottom: "20px" }}
              />
              <TextField
                label="Image URL"
                fullWidth
                value={currentArticle.image}
                onChange={(e) =>
                  setCurrentArticle({ ...currentArticle, image: e.target.value })
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