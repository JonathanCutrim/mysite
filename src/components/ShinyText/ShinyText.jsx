import React from 'react';
import './ShinyText.css';

const ShinyText = ({ text, disabled = false, speed = 5, className = '', theme = 'default' }) => {
  const animationDuration = `${speed}s`;
  
  // Get theme-specific class
  const getThemeClass = () => {
    switch (theme) {
      case 'white':
        return 'shiny-text-cyberpunk';
      case 'black':
        return 'shiny-text-cyberpunk';
      case 'cyberpunk':
        return 'shiny-text-cyberpunk';
      default:
        return '';
    }
  };

  return (
    <div
      className={`shiny-text uppercase ${disabled ? 'disabled' : ''} ${className} ${getThemeClass()}`}
      style={{ animationDuration }}
    >
      {text}
    </div>
  );
};

export default ShinyText;