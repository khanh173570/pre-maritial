import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUsers,
  getArticles,
  createArticle,
  getCategories,
} from "./adminServices";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [referencePath, setReferencePath] = useState("");
  const [therapistId, setTherapistId] = useState("");
  const [referenceArticleId, setReferenceArticleId] = useState("");
  const [categoryId, setCategoryId] = useState(""); // State for category
  const [therapists, setTherapists] = useState([]);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers(); // Fetch all users
        const therapistsWithRole = users.filter((user) => user.roleId === 2); // Filter users with roleId = 2
        setTherapists(therapistsWithRole);

        const articlesData = await getArticles(); // Fetch all articles
        setArticles(articlesData.content || []);

        const categoriesData = await getCategories(); // Fetch all categories
        setCategories(categoriesData.content || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user")); // Get user from local storage
    const approvedUserId = user?.id;

    const newArticle = {
      title,
      referencePath,
      status: "APPROVED",
      approvedUserId,
      therapistId: parseInt(therapistId),
      categoryId: parseInt(categoryId), // Include categoryId
      referenceArticleId: parseInt(referenceArticleId),
      isActive: true,
    };

    try {
      await createArticle(newArticle); // Call the API to create the article
      alert("Article created successfully!");
      navigate("/articles"); // Redirect to the articles list page
    } catch (error) {
      console.error("Error creating article:", error);
      alert("Failed to create article.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Create New Article</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="referencePath">Reference Path</label>
          <input
            type="text"
            id="referencePath"
            className="form-control"
            value={referencePath}
            onChange={(e) => setReferencePath(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="therapistId">Therapist</label>
          <select
            id="therapistId"
            className="form-control"
            value={therapistId}
            onChange={(e) => setTherapistId(e.target.value)}
            required
          >
            <option value="">Select Therapist</option>
            {therapists.map((therapist) => (
              <option key={therapist.id} value={therapist.id}>
                {therapist.username}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="referenceArticleId">Reference Article</label>
          <select
            id="referenceArticleId"
            className="form-control"
            value={referenceArticleId}
            onChange={(e) => setReferenceArticleId(e.target.value)}
          >
            <option value="">Select Reference Article</option>
            {articles.map((article) => (
              <option key={article.id} value={article.id}>
                {article.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="categoryId">Category</label>
          <select
            id="categoryId"
            className="form-control"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Create Article
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
