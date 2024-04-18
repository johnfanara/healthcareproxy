import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationInfoForm from './NavigationInfoForm';

const NavigationBar = () => {
  const [formType, setFormType] = useState('');

  const handleLinkClick = (type) => {
    setFormType(type);
  };

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
        <Link to="/about" onClick={() => handleLinkClick('about')}>About</Link>
        <Link to="/mission-statement" onClick={() => handleLinkClick('mission-statement')}>Mission Statement</Link>
        <Link to="/contacts" onClick={() => handleLinkClick('contacts')}>Constact us</Link>
        <Link to="/help" onClick={() => handleLinkClick('help')}>Help</Link>
      </div>
    </div>
  );
};

export default NavigationBar;
