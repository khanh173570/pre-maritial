import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleParts,
  updateArticlePart,
  createArticlePart,
} from "./adminServices"; // Add createArticlePart

const ArticleDetails = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [articleParts, setArticleParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null); // Track the selected article part
  const [newPart, setNewPart] = useState(null); // Track the new article part
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleParts = async () => {
      try {
        setLoading(true);
        const data = await getArticleParts(); // Fetch article parts
        const filteredParts = data.content.filter(
          (part) => part.articleId === parseInt(id)
        ); // Filter by articleId
        setArticleParts(filteredParts);
      } catch (error) {
        console.error("Error fetching article parts:", error);
        setError("Failed to fetch article parts.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleParts();
  }, [id]);

  const handleEditClick = (part) => {
    setSelectedPart(part); // Set the selected article part for editing
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedPart) {
      setSelectedPart((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (newPart) {
      setNewPart((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      if (!selectedPart) return;

      // Create a payload excluding the `id` field
      const { id, ...payload } = selectedPart;

      // Log the payload being sent to the API
      console.log("Payload being sent to API:", payload);

      // Call the API to update the article part
      await updateArticlePart(id, payload);

      // Update the articleParts state with the updated part
      setArticleParts((prevParts) =>
        prevParts.map((part) =>
          part.id === id ? { ...part, ...payload } : part
        )
      );

      alert("Article part updated successfully!");
      setSelectedPart(null); // Clear the form after updating
    } catch (error) {
      console.error("Error updating article part:", error);
      alert("Failed to update article part.");
    }
  };

  const handleNewPart = () => {
    // Initialize a new part with default values
    const orderIndex =
      articleParts.length > 0
        ? Math.max(...articleParts.map((part) => part.orderIndex)) + 1
        : 1;

    setNewPart({
      title: "",
      content: "",
      orderIndex,
      imageLink: "",
      articleId: parseInt(id),
      isActive: true,
    });
  };

  const handleCreate = async () => {
    try {
      if (!newPart) return;

      // Log the payload being sent to the API
      console.log("Payload being sent to API:", newPart);

      // Call the API to create the new article part
      const createdPart = await createArticlePart(newPart);

      // Merge the newPart data with the response (if necessary)
      const updatedPart = {
        ...newPart, // Use the data from the form
        ...createdPart, // Overwrite with any data returned by the API
      };

      // Add the new part to the articleParts state
      setArticleParts((prevParts) => [...prevParts, updatedPart]);

      alert("New article part created successfully!");
      setNewPart(null); // Clear the form after creating
    } catch (error) {
      console.error("Error creating article part:", error);
      alert("Failed to create article part.");
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
      <h1 className="mb-4">Article Details</h1>
      <button className="btn btn-success mb-4" onClick={handleNewPart}>
        Add New Part
      </button>
      {articleParts.length > 0 ? (
        articleParts.map((part) => (
          <div key={part.id} className="mb-4">
            <h3>{part.title}</h3>
            <p>{part.content}</p>
            {part.imageLink && (
              <p>
                <strong>Image URL:</strong> {part.imageLink}
              </p>
            )}
            <button
              className="btn btn-primary btn-sm mt-2"
              onClick={() => handleEditClick(part)}
            >
              Edit
            </button>
            <hr />
          </div>
        ))
      ) : (
        <div className="text-center">No article parts available.</div>
      )}

      {(selectedPart || newPart) && (
        <div className="mt-4">
          <h2>{selectedPart ? "Edit Article Part" : "Add New Article Part"}</h2>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={selectedPart ? selectedPart.title : newPart.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                className="form-control"
                rows="5"
                value={selectedPart ? selectedPart.content : newPart.content}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="imageLink">Image Link</label>
              <input
                type="text"
                id="imageLink"
                name="imageLink"
                className="form-control"
                value={
                  selectedPart ? selectedPart.imageLink : newPart.imageLink
                }
                onChange={handleInputChange}
              />
            </div>
            {selectedPart ? (
              <button
                type="button"
                className="btn btn-success mt-3"
                onClick={handleUpdate}
              >
                Update
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success mt-3"
                onClick={handleCreate}
              >
                Create
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary mt-3 ml-2"
              onClick={() => {
                setSelectedPart(null);
                setNewPart(null);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ArticleDetails;
