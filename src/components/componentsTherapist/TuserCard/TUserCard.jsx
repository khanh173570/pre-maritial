// src/components/therapist/TuserCard/TUserCard.jsx
import React from "react";

const TUserCard = ({ username, email, onLogout }) => {
  return (
    <div className="user-card">
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default TUserCard;
