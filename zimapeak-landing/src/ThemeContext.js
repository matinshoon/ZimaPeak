// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext(); // Create a new context

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true); // Initial theme state

  useEffect(() => {
    // Get the current time
    const currentTime = new Date().getHours();

    // Set the theme based on the current time
    if (currentTime >= 5 && currentTime < 18) {
      setDarkMode(false);
    } else {
      setDarkMode(true); // Set dark mode for the rest of the time
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode); // Toggle theme state
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
