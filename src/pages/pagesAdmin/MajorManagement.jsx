import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMajor, getMajors } from "./adminServices";
import { Button } from "react-bootstrap";
import MajorsTable from "../../components/componentsAdmin/majorsTable/MajorsTable";

const MajorManagement = () => {
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const data = await getMajors();
        setMajors(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMajors();
  }, []);

  const handleDelete = async (majorId) => {
    try {
      const response = await deleteMajor(majorId);
      if (response) {
        setMajors((prevMajors) =>
          prevMajors.filter((major) => major.id !== majorId)
        );
      } else {
        console.error("Failed to delete major from the database");
      }
    } catch (error) {
      console.error("Error deleting major:", error);
      setError(error);
    }
  };

  const handleEdit = (majorId) => {
    navigate(`/edit-therapist-major/${majorId}`);
  };

  const handleAddClick = () => {
    navigate("/majors/new");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Major Management</h1>
      <span>
        <Button
          variant="primary"
          onClick={handleAddClick}
          style={{ marginBottom: 10 }}
        >
          Add Major
        </Button>
      </span>
      <MajorsTable
        majors={majors}
        onDelete={handleDelete}
        onEdit={handleEdit}
      ></MajorsTable>
    </div>
  );
};

export default MajorManagement;
