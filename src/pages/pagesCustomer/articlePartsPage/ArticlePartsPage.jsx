import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getArticleParts } from "../customerServices";
import "./ArticlePartsPage.css";

const ArticlePartsPage = () => {
  const { articleId } = useParams(); // Get the article ID from the URL
  const { state } = useLocation();
  const [articleParts, setArticleParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleParts = async () => {
      setLoading(true);
      try {
        const data = await getArticleParts(); // Fetch all article parts
        const filteredParts = data.content.filter(
          (part) => part.articleId === parseInt(articleId)
        ); // Filter parts by articleId
        setArticleParts(filteredParts);
      } catch (error) {
        console.error("Error fetching article parts:", error);
        setError("Failed to fetch article parts.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleParts();
  }, [articleId]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4 article-title-parts-page">
        {state?.articleTitle || "Article Parts"}
      </h1>
      {articleParts.length > 0 ? (
        <ul className="article-parts-continuous">
          {articleParts.map((part) => (
            <li key={part.id} className="article-part-section">
              <h3>{part.title}</h3>
              <p>{part.content}</p>
              {part.imageLink && (
                <img
                  src={part.imageLink}
                  alt={part.title}
                  className="article-part-image"
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No article parts available.</p>
      )}
    </div>
  );
};

export default ArticlePartsPage;
