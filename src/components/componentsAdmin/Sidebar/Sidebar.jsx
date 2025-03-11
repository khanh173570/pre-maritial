import React from "react";
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

  return (
    <aside
      id=""
      className={`sidebar ${openSidebarToggle ? "sidebar-responsive" : ""}`}
    >
      <div className="sidebar-title">
        <div className="welcome-card">
          <h3>Welcome admin</h3>
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
        <li className="sidebar-list-item">
          <Link to="/articles">
            <BsTextParagraph className="icon" /> Articles
          </Link>
        </li>
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
          <a href="">
            <BsCurrencyDollar className="icon" /> Transaction
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsWalletFill className="icon" /> Wallet
          </a>
        </li>
        <li className="sidebar-list-item">
          <Link to="/therapists">
            <BsTextParagraph className="icon" /> Articles
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
