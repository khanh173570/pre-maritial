import React, { useEffect, useState } from "react";
import { deleteArticle, getArticles } from "./adminServices";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../components/Pagination/Pagination";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(8); // Number of items per page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await getArticles(); // Fetch articles
        console.log("API Response:", data.content); // Log the API response
        setArticles(data.content || []); // Extract and set the `content` array
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Failed to fetch articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Pagination logic
  const indexOfLastArticle = currentPage * itemsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteArticle(id); // Call the deleteArticle API
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article.id !== id)
        ); // Remove the deleted article from the state
        alert("Article deleted successfully!");
      } catch (error) {
        console.error("Error deleting article:", error);
        alert("Failed to delete the article.");
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Articles List</h1>
      <button
        className="btn btn-success mb-4"
        onClick={() => navigate("/articles/create")}
      >
        Add New Article
      </button>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Reference Path</th>
            <th>Status</th>
            <th>Approved By</th>
            <th>Therapist ID</th>
            <th>Category ID</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentArticles.length > 0 ? (
            currentArticles.map((article) => (
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.title}</td>
                <td>
                  <a
                    href={article.referencePath}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.referencePath}
                  </a>
                </td>
                <td>{article.status}</td>
                <td>{article.approvedUserId || "N/A"}</td>
                <td>{article.therapistId || "N/A"}</td>
                <td>{article.categoryId}</td>
                <td>{article.isActive ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/articles/${article.id}/details`)}
                  >
                    Show Details
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(article.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No articles available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Component */}
      <Pagination
        postsPerPage={itemsPerPage}
        totalPosts={articles.length}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default ArticlesList;
