import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMajorById, updateMajor } from "./adminServices"; // You need to implement these functions in adminServices.js
import { Form, Button, Alert } from "react-bootstrap";

const MajorInfoForm = () => {
  const { majorId } = useParams();
  const [major, setMajor] = useState({
    name: "",
    isActive: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("majorId from useParams:", majorId);
    const fetchMajor = async () => {
      try {
        const data = await getMajorById(majorId);
        setMajor({
          name: data.name || "",
          isActive: data.isActive || false,
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMajor();
  }, [majorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMajor((prevMajor) => ({
      ...prevMajor,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (major.name.trim() === "") {
      return "Name is required.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setValidationError(validationError);
      return;
    }
    try {
      console.log("Updating major with data:", major); // Log the request data
      await updateMajor(majorId, major);
      navigate("/view-therapist-major"); // Navigate back to the majors page after successful update
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      {validationError && <Alert variant="danger">{validationError}</Alert>}
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={major.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formIsActive">
        <Form.Label>Is Active</Form.Label>
        <Form.Check
          type="checkbox"
          name="isActive"
          checked={major.isActive}
          onChange={(e) =>
            setMajor((prevMajor) => ({
              ...prevMajor,
              isActive: e.target.checked,
            }))
          }
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default MajorInfoForm;
