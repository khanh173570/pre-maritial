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
import { Link } from "react-router-dom";

function Sidebar({ openSidebarToggle, openSideBar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
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
        <li className="sidebar-list-item">
          <a href="">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsTextParagraph className="icon" /> Articles
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsPersonCircle className="icon" /> Accounts
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsCurrencyDollar className="icon" /> Transaction
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsWalletFill className="icon" /> Wallet
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
