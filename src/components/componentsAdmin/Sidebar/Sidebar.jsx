import React, { useEffect, useState } from "react";
import {
  BsCurrencyDollar,
  BsWalletFill,
  BsGrid1X2Fill,
  BsHeartFill,
  BsPersonCircle,
  BsTextParagraph,
  BsXCircle,
} from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import View_Therapist from "./../../../pages/pagesAdmin/View_Therapist/View_Therapist";

function Sidebar({ openSidebarToggle, openSideBar }) {
  const location = useLocation();
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Retrieve the user object from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userObject = JSON.parse(storedUser); // Parse the JSON string
        setUsername(userObject.username); // Extract the username
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);
  return (
    <aside
      id=""
      className={`sidebar ${openSidebarToggle ? "sidebar-responsive" : ""}`}
    >
      <div className="sidebar-brand">
        <BsHeartFill className="icon_header" /> PreMarital
      </div>
      <div className="sidebar-title">
        {/* <div className="welcome-card">
          <h3>Welcome admin</h3>
        </div> */}
        <div className="admin-profile">
          <img
            src="https://cdn.vectorstock.com/i/500p/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg" // Replace with the admin's profile picture URL
            alt="Admin Profile"
            className="admin-profile-pic"
          />
          <div className="admin-profile-info">
            <h4>{username ? username : "Unidentified user"}</h4>
            <p>Administrator</p>
          </div>
        </div>
        <span className="icon close_icon" onClick={openSideBar}>
          <BsXCircle />
        </span>
      </div>

      <ul className="sidebar-list">
        <li
          className={`sidebar-list-item ${
            location.pathname === "/dashboard" ? "active" : ""
          }`}
        >
          <Link to="/dashboard">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        {/* <li className="sidebar-list-item">
          <Link to="/articles">
            <BsTextParagraph className="icon" /> Articles
          </Link>
        </li> */}
        <li
          className={`sidebar-list-item ${
            location.pathname === "/accounts" ? "active" : ""
          }`}
        >
          <Link to="/accounts">
            <BsPersonCircle className="icon" /> Accounts
          </Link>
        </li>
        <li
          className={`sidebar-list-item ${
            location.pathname === "/transactions" ? "active" : ""
          }`}
        >
          <Link to="/transactions">
            <BsCurrencyDollar className="icon" /> Transaction
          </Link>
        </li>
        {/* <li className="sidebar-list-item">
          <a href="">
            <BsWalletFill className="icon" /> Wallet
          </a>
        </li> */}
        {/* <li
          className={`sidebar-list-item ${
            location.pathname === "/view-therapists" ? "active" : ""
          }`}
        >
          <Link to="/view-therapists">
            <BsTextParagraph className="icon" /> Therapists
          </Link>
        </li> */}
        <li
          className={`sidebar-list-item ${
            location.pathname === "/view-therapist-major" ? "active" : ""
          }`}
        >
          <Link to="/view-therapist-major">
            <BsTextParagraph className="icon" /> Majors
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
