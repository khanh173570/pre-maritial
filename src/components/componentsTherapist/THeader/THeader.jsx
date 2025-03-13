// src/components/componentsTherapist/THeader/THeader.jsx
import React, { useState } from "react";
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle } from "react-icons/bs";
import UserCard from "../TuserCard/TUserCard"; // Make sure this path is correct

const THeader = () => {  // Renamed to match the file name (THeader)
  const [showUserCard, setShowUserCard] = useState(false);
  const [username] = useState("Therapist Name");  // Example name
  const [email] = useState("therapist@example.com");  // Example email

  const toggleUserCard = () => setShowUserCard(!showUserCard);

  return (
    <header className="header-therapist">
      <div className="header-left">
        <h3>PreMarital Counseling</h3>
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" />
        <BsPersonCircle className="icon" onClick={toggleUserCard} />
        {showUserCard && <UserCard username={username} email={email} />}
      </div>
    </header>
  );
};

export default THeader;
