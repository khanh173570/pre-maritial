import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArticles, getUsers } from "../customerServices";
import "./View_Article.css";

// // Import images
import ar1 from "../../../assets/asstetsCustomer/ar1.jpg";
import ar2 from "../../../assets/asstetsCustomer/ar2.jpg";
import ar3 from "../../../assets/asstetsCustomer/ar3.jpg";
import ar4 from "../../../assets/asstetsCustomer/ar4.jpg";
import ar5 from "../../../assets/asstetsCustomer/ar5.jpg";
import ar6 from "../../../assets/asstetsCustomer/ar6.jpg";
import ar7 from "../../../assets/asstetsCustomer/ar7.jpg";

const images = [ar1, ar2, ar3, ar4, ar5, ar6, ar7];

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [authors, setAuthors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticlesAndAuthors = async () => {
      setLoading(true);
      try {
        const articlesData = await getArticles(currentPage);
        setArticles(articlesData.content || []);
        setTotalPages(articlesData.totalPages || 1);

        const users = await getUsers();
        const authorsMap = {};
        users.forEach((user) => {
          authorsMap[user.id] = user.username;
        });
        setAuthors(authorsMap);
      } catch (error) {
        console.error("Error fetching articles or users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticlesAndAuthors();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getRandomImage = () => {
    return images[Math.floor(Math.random() * images.length)];
  };

  const handleArticleClick = (articleId, articleTitle, authorName) => {
    navigate(`/customer-home/articles/${articleId}/parts`, {
      state: { articleTitle, author: authorName }, // Pass the article title and author name
    });
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading articles...</p>
      </div>
    );

  return (
    <div className="articles-page">
      <h2 className="page-title">Article List</h2>
      {articles.length === 0 ? (
        <p className="empty-message">No articles available.</p>
      ) : (
        <ul className="articles-list">
          {articles.map((article) => (
            <li
              key={article.id}
              className="article-item"
              onClick={() =>
                handleArticleClick(
                  article.id,
                  article.title,
                  authors[article.approvedUserId] || "Author unknown" // Pass the author's name or "Author unknown"
                )
              }
            >
              <img
                src={getRandomImage()}
                alt="Article"
                className="article-image"
              />
              <h3 className="article-title">{article.title}</h3>
              <p className="article-content">{article.content}</p>
              <small className="article-author">
                {authors[article.approvedUserId]
                  ? `Authored by ${authors[article.approvedUserId]}`
                  : "Author unknown"}
              </small>
            </li>
          ))}
        </ul>
      )}
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span className="pagination-info">
          Page {currentPage} / {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default ArticlesPage;
