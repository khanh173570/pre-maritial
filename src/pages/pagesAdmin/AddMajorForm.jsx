import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMajor } from "./adminServices"; // You need to implement this function in adminServices.js
import { Form, Button, Alert } from "react-bootstrap";

const AddMajorForm = () => {
  const [major, setMajor] = useState({
    name: "",
    isActive: false,
  });
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

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
      console.log("Adding major with data:", major); // Log the request data
      await addMajor(major);
      navigate("/view-therapist-major"); // Navigate back to the majors page after successful addition
    } catch (err) {
      setError(err);
      console.log("Error adding major:", error);
    }
  };

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
        Add
      </Button>
    </Form>
  );
};

export default AddMajorForm;
