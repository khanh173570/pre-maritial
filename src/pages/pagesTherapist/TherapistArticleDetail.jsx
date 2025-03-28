import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";

// This component displays the full details of a single article.
// Mock data is used; replace with API calls when ready.
const TherapistArticleDetail = () => {
  const { id } = useParams(); // Get article ID from URL
  const navigate = useNavigate();

  // Mock data (same as in TherapistArticles for consistency)
  const mockArticles = [
    {
      id: 1,
      title: "5 Tips for Better Communication",
      content: "Effective communication is key to a healthy relationship. Here are five tips to improve how you and your partner talk to each other. Start by actively listening, ensuring you understand your partner's perspective before responding. Next, use 'I' statements to express your feelings without blaming. Third, set aside time for meaningful conversations without distractions. Fourth, be mindful of your tone and body language, as they can impact how your message is received. Finally, practice patience and empathy, recognizing that communication is a skill that takes time to develop.",
      lastUpdated: "2025-03-27",
      image: "https://via.placeholder.com/300x200?text=Communication",
    },
    {
      id: 2,
      title: "Managing Conflict in Relationships",
      content: "Conflict is inevitable, but it doesn’t have to harm your relationship. Learn strategies to resolve disagreements constructively. Begin by taking a step back to cool off if emotions run high. Then, approach the conversation with a problem-solving mindset, focusing on the issue rather than personal attacks. Listen to your partner’s perspective without interrupting, and validate their feelings even if you disagree. Work together to find a compromise that respects both of your needs. Finally, reflect on the conflict to identify patterns and prevent future issues.",
      lastUpdated: "2025-03-26",
      image: "https://via.placeholder.com/300x200?text=Conflict",
    },
  ];

  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Simulate fetching the article by ID
    // TODO: Replace with API call, e.g.:
    // const fetchArticle = async () => {
    //   const data = await fetchTherapistArticleById(id);
    //   setArticle(data);
    // };
    const foundArticle = mockArticles.find((a) => a.id === parseInt(id));
    if (foundArticle) {
      setArticle(foundArticle);
    } else {
      navigate("/therapist-home/articles"); // Redirect if article not found
    }
  }, [id, navigate]);

  if (!article) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ marginLeft: "250px", padding: "20px" }}>
      <Button
        variant="outlined"
        onClick={() => navigate("/therapist-home/articles")}
        sx={{ marginBottom: "20px" }}
      >
        Back to Articles
      </Button>
      <Typography variant="h4" gutterBottom>
        {article.title}
      </Typography>
      <CardMedia
        component="img"
        height="300"
        image={article.image}
        alt={article.title}
        sx={{ marginBottom: "20px", maxWidth: "600px" }}
      />
      <Typography variant="body1" paragraph>
        {article.content}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Last Updated: {article.lastUpdated}
      </Typography>
    </Box>
  );
};

export default TherapistArticleDetail;