import React from "react";
import { Table, Button } from "react-bootstrap";

const roleMapping = {
  1: "Admin",
  2: "Therapist",
  3: "Customer",
};

const UserTable = ({ users, onDelete, onEdit }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Role</th>
          <th>Email</th>
          <th>Is active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>
              {user.firstName} {user.lastName}
            </td>
            <td>{user.username}</td>
            <td>{roleMapping[user.roleId]}</td>
            <td>{user.email}</td>
            <td>{user.isActive ? "Yes" : "No"}</td>
            <td>
              <Button variant="danger" onClick={() => onDelete(user.id)}>
                Delete
              </Button>{" "}
              <Button variant="primary" onClick={() => onEdit(user.id)}>
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
