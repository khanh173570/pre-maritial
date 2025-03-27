import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { getUsers } from "../adminServices";
import { Pagination } from "../../../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";

const View_Therapist = () => {
  const [filteredTherapists, setFilteredTherapists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        setLoading(true);
        const users = await getUsers(); // Fetch all users
        const therapistsWithRole = users.filter((user) => user.roleId === 2); // Filter users with roleId = 2
        setFilteredTherapists(therapistsWithRole);
        console.log(therapistsWithRole);
      } catch (error) {
        console.error("Error fetching therapists:", error);
        setError("Failed to fetch therapists.");
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  // Pagination logic
  const indexOfLastTherapist = currentPage * itemsPerPage;
  const indexOfFirstTherapist = indexOfLastTherapist - itemsPerPage;
  const currentTherapists = filteredTherapists.slice(
    indexOfFirstTherapist,
    indexOfLastTherapist
  );

  if (loading) {
    return <div className="mt-4">Loading...</div>; // Display loading message
  }

  if (error) {
    return <div className="text-center mt-4 text-danger">{error}</div>;
  }

  // Handle Edit Button Click
  const handleEdit = (userId) => {
    navigate(`/edit-therapist/${userId}`); // Navigate to the edit form page with userId
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Therapist List</h1>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentTherapists.map((therapist) => (
            <tr key={therapist.id}>
              <td>{therapist.id}</td>
              <td>
                {therapist.firstName} {therapist.lastName}
              </td>
              <td>{therapist.email}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(therapist.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        postsPerPage={itemsPerPage}
        totalPosts={filteredTherapists.length}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default View_Therapist;
