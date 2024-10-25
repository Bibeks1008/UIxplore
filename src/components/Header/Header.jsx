import React from "react";

import "./header.css";

import logo from "../../assets/images/logo.svg";

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="header-logo" className="header-img" />

      <div className="right-section">
        <input className="search-bar" placeholder="Search" />
        <div className="mid-section">
          <span className="web-section">Web</span>
          <span className="app-section">App</span>
        </div>
        <button className="signin-btn">Sign in</button>
      </div>
    </div>
  );
};

export default Header;
