import React, { useEffect, useState } from "react";
import { BsPersonCircle, BsHeartFill, BsJustify } from "react-icons/bs";
import UserCard from "../userCard/UserCard";
import { useNavigate } from "react-router-dom";

const ComponentsHeader = ({ openSideBar }) => {
  const [showUserCard, setShowUserCard] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  //get the user from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User from localStorage:", user);
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, []);

  //check if the username and email are updated
  useEffect(() => {
    console.log("Username:", username);
    console.log("Email:", email);
  }, [username, email]);

  //toggle the user card
  const toggleUserCard = () => {
    setShowUserCard(!showUserCard);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to the login page
  };

  return (
    <header className="header-admin">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={openSideBar} />
      </div>
      <div className="header-left"></div>
      <div className="header-right">
        {/* <BsFillBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" /> */}
        <BsPersonCircle className="icon" onClick={toggleUserCard} />
        {showUserCard && (
          <UserCard username={username} email={email} onLogout={handleLogout} />
        )}
      </div>
    </header>
  );
};

export default ComponentsHeader;
