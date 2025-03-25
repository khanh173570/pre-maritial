import React from "react";
import {
  BsCurrencyDollar,
  BsWalletFill,
  BsGrid1X2Fill,
  BsHeartFill,
  BsPersonCircle,
  BsTextParagraph,
  BsClipboard,
  BsPencil,
} from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ openSidebarToggle, openSideBar }) {
  const location = useLocation();

  return (
    <aside className={`sidebar ${openSidebarToggle ? "sidebar-responsive" : ""}`}>
      <div className="sidebar-title">
        <div className="welcome-card">
          <h3>Welcome Therapist</h3>
        </div>
        <span className="icon close_icon" onClick={openSideBar}>
        
        </span>
      </div>

      <ul className="sidebar-list">
        {/* Dashboard */}
        <li className={`sidebar-list-item ${location.pathname === "/therapist-home" ? "active" : ""}`}>
          <Link to="/therapist-home">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>

        {/* Clients */}
        <li className={`sidebar-list-item ${location.pathname === "/clients" ? "active" : ""}`}>
          <Link to="/clients">
            <BsPersonCircle className="icon" /> Clients
          </Link>
        </li>

        {/* Sessions */}
        <li className={`sidebar-list-item ${location.pathname === "/sessions" ? "active" : ""}`}>
          <Link to="/sessions">
            <BsClipboard className="icon" /> Sessions
          </Link>
        </li>

        {/* Wallet */}
        <li className={`sidebar-list-item ${location.pathname === "/wallet" ? "active" : ""}`}>
          <Link to="/wallet">
            <BsWalletFill className="icon" /> Wallet
          </Link>
        </li>

        {/* Articles */}
        <li className={`sidebar-list-item ${location.pathname === "/articles" ? "active" : ""}`}>
          <Link to="/articles">
            <BsPencil className="icon" /> Articles
          </Link>
        </li>

        {/* Quiz */}
        <li className={`sidebar-list-item ${location.pathname === "/quiz" ? "active" : ""}`}>
          <Link to="/quiz">
            <BsClipboard className="icon" /> Quiz
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
