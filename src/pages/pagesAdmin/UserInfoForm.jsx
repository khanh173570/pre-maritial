import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "./adminServices";
import { Form, Button, Alert } from "react-bootstrap";
import {
  validateFirstname,
  validateLastname,
  validateEmail,
  validateAddress,
} from "../../utils/validation/valAdd";

const UserInfoForm = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    roleId: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isActive: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(userId);
        setUser({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          username: data.username || "",
          roleId: data.roleId || "",
          street: data.street || "",
          city: data.city || "",
          state: data.state || "",
          postalCode: data.postalCode || "",
          country: data.country || "",
          isActive: data.isActive || false,
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!validateFirstname(user.firstName)) {
      return "First name must be between 1 and 20 characters and contain only letters.";
    }
    if (!validateLastname(user.lastName)) {
      return "Last name must be between 1 and 20 characters and contain only letters.";
    }
    if (!validateEmail(user.email)) {
      return "Email must be a valid Gmail address.";
    }
    if (!validateAddress(user.street)) {
      return "Street must be between 1 and 50 characters.";
    }
    if (!validateAddress(user.city)) {
      return "City must be between 1 and 50 characters.";
    }
    if (!validateAddress(user.state)) {
      return "State must be between 1 and 50 characters.";
    }
    if (!validateAddress(user.postalCode)) {
      return "Postal code must be between 1 and 50 characters.";
    }
    if (!validateAddress(user.country)) {
      return "Country must be between 1 and 50 characters.";
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
      console.log("Updating user with data:", user); // Log the request data
      await updateUser(userId, user);
      navigate("/accounts"); // Navigate back to the accounts page after successful update
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
          disabled
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
        <Form.Label>Role ID</Form.Label>
        <Form.Control
          type="number"
          name="roleId"
          value={user.roleId}
          onChange={handleChange}
          disabled
        />
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
        Save
      </Button>
    </Form>
  );
};

export default UserInfoForm;
