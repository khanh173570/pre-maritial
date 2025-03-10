import React from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsHeartFill,
  BsJustify,
} from "react-icons/bs";

const componentsHeader = ({ openSideBar }) => {
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={openSideBar} />
      </div>
      <div className="header-left">
        <div className="sidebar-brand">
          <BsHeartFill className="icon_header" /> PreMarital
        </div>
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
};

export default componentsHeader;
