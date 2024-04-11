import React from 'react';

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <div className="hamburger-menu">
        {/* Hamburger menu icon */}
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="menu">
        {/* Links */}
        <a href="/about">About</a>
        <a href="/mission-statement">Mission Statement</a>
        <a href="/contacts">Constact Us</a>
        <a href="/help">Help</a>
      </div>
    </div>
  );
}

export default NavigationBar;
