import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "./adminServices"; // You need to implement this function in adminServices.js
import { Form, Button, Alert } from "react-bootstrap";

const AddUserForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    roleId: 1,
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isActive: true,
  });
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (user.firstName.trim() === "") {
      return "First name is required.";
    }
    if (user.lastName.trim() === "") {
      return "Last name is required.";
    }
    if (user.email.trim() === "") {
      return "Email is required.";
    }
    if (user.username.trim() === "") {
      return "Username is required.";
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
      console.log("Adding user with data:", user); // Log the request data
      await addUser(user);
      navigate("/accounts"); // Navigate back to the accounts page after successful addition
    } catch (err) {
      setError(err);
      console.log("Error adding user:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {validationError && <Alert variant="danger">{validationError}</Alert>}
      <Form.Group controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formRoleId">
        <Form.Label>Role</Form.Label>
        <Form.Control
          as="select"
          name="roleId"
          value={user.roleId}
          onChange={handleChange}
        >
          <option value={1}>Admin</option>
          <option value={2}>Therapist</option>
          <option value={3}>Customer</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formStreet">
        <Form.Label>Street</Form.Label>
        <Form.Control
          type="text"
          name="street"
          value={user.street}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formCity">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={user.city}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formState">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          name="state"
          value={user.state}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formPostalCode">
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type="text"
          name="postalCode"
          value={user.postalCode}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formCountry">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          name="country"
          value={user.country}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formIsActive">
        <Form.Label>Is Active</Form.Label>
        <Form.Check
          type="checkbox"
          name="isActive"
          checked={user.isActive}
          onChange={(e) =>
            setUser((prevUser) => ({
              ...prevUser,
              isActive: e.target.checked,
            }))
          }
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add User
      </Button>
    </Form>
  );
};

export default AddUserForm;
