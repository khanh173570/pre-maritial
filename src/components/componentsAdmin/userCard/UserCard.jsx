import React from "react";
import { Button } from "react-bootstrap";

const UserCard = ({ username, email, onLogout }) => {
  return (
    <div className="user-card">
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
};

export default UserCard;
