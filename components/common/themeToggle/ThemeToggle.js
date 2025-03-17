import React from 'react';
import './ThemeToggle.css';
import { useTheme } from '../../../context/ThemeContext';

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className="theme-toggle" id="theme-toggle" onClick={toggleTheme}></div>
  );
};

export default ThemeToggle;