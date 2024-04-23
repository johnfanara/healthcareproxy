import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const [formType, setFormType] = useState('');
  const navigate = useNavigate();

  const handleLinkClick = (type) => {
    setFormType(type);
  };

  const clearAndGoHome = () => {
    setFormType('');
    navigate('/');
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
        <Link to="/" onClick={clearAndGoHome}>Home</Link>
        <Link to="/about" onClick={() => handleLinkClick('about')}>About</Link>
        <Link to="/mission-statement" onClick={() => handleLinkClick('mission-statement')}>Mission Statement</Link>
        <Link to="/contacts" onClick={() => handleLinkClick('contacts')}>Contact us</Link>
        <Link to="/help" onClick={() => handleLinkClick('help')}>Help</Link>
      </div>
    </div>
  );
};

export default NavigationBar;
