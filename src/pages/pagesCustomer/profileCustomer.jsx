import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { updateUser } from "./customerServices";
import "./ProfileCustomer.css";

const ProfileCustomer = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isActive: true,
  };

  const [user, setUser] = useState(storedUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...storedUser });

  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" />;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedUser({
      ...editedUser,
      [name]: name === "isActive" ? value === "true" : value,
    });
  };

  const handleSave = async () => {
    try {
      localStorage.setItem("user", JSON.stringify(editedUser));
      setUser(editedUser);
      setIsEditing(false);
      await updateUser(storedUser.id, editedUser);
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error.response?.data);
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Thông tin cá nhân</h1>
      <div className="profile-info">
        <Form>
          <div className="profile-columns">
            <div className="profile-column">
              {["firstName", "lastName", "email", "username"].map((field) => (
                <Form.Group key={field} className="profile-field">
                  <Form.Label>
                    <strong>{field.replace(/([A-Z])/g, " $1").trim()}:</strong>
                  </Form.Label>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      name={field}
                      value={editedUser[field] || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="profile-value">{user[field]}</p>
                  )}
                </Form.Group>
              ))}

              <Form.Group className="profile-field">
                <Form.Label>
                  <strong>Trạng thái:</strong>
                </Form.Label>
                {isEditing ? (
                  <Form.Select
                    name="isActive"
                    value={editedUser.isActive.toString()}
                    onChange={handleChange}
                  >
                    <option value="true">Hoạt động</option>
                    <option value="false">Không hoạt động</option>
                  </Form.Select>
                ) : (
                  <p className="profile-value">
                    {user.isActive ? "Hoạt động" : "Không hoạt động"}
                  </p>
                )}
              </Form.Group>
            </div>
            <div className="profile-column">
              {["street", "city", "state", "postalCode", "country"].map(
                (field) => (
                  <Form.Group key={field} className="profile-field">
                    <Form.Label>
                      <strong>
                        {field.replace(/([A-Z])/g, " $1").trim()}:
                      </strong>
                    </Form.Label>
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        name={field}
                        value={editedUser[field] || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="profile-value">{user[field]}</p>
                    )}
                  </Form.Group>
                )
              )}
            </div>
          </div>
        </Form>
      </div>
      <div className="profile-actions">
        {isEditing ? (
          <>
            <Button variant="success" onClick={handleSave} className="me-2">
              Lưu
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Hủy
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={handleEdit} className="me-2">
            Chỉnh sửa
          </Button>
        )}
        <Button variant="danger" onClick={() => navigate(-1)}>
          Trở lại
        </Button>
      </div>
    </div>
  );
};

export default ProfileCustomer;
