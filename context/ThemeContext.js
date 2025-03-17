import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    
    if (!darkMode) {
      document.documentElement.style.setProperty('--color-bg', '#000000');
      document.documentElement.style.setProperty('--color-text', '#ffffff');
    } else {
      document.documentElement.style.setProperty('--color-bg', '#ffffff');
      document.documentElement.style.setProperty('--color-text', '#000000');
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);