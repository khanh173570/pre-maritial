import React from "react";

const UserCard = ({ username, email, onLogout }) => {
  return (
    <div className="user-card">
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserCard;
