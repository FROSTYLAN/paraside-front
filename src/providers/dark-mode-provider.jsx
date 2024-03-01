// DarkModeContext.js

import React, { createContext, useContext, useState } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const controlDarkMode = (style) => {
    return `${style} ${darkMode ? 'dark' : ''}`
  }

  const getBorderStyle = () => {
    return {
      border: `1px solid var(--color-${darkMode ? 'primary' : 'border-primary'})`
    };
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, getBorderStyle, toggleDarkMode, controlDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode debe ser utilizado dentro de un DarkModeProvider');
  }
  return context;
};
