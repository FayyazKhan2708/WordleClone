import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Check if user has a theme preference in localStorage
  // If not, check for system preference, default to light
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  // Add transition class on first render
  useEffect(() => {
    // Add transition class to handle smooth transitions
    document.documentElement.classList.add("theme-transition");

    // Remove transition class after transitions complete to avoid transition
    // when page first loads
    const transitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 100);

    return () => {
      clearTimeout(transitionTimeout);
    };
  }, []);

  // Update the class on the document whenever theme changes
  useEffect(() => {
    // Add transition class before changing theme
    document.documentElement.classList.add("theme-transition");

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // Remove transition class after transitions complete
    const transitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 500);

    return () => {
      clearTimeout(transitionTimeout);
    };
  }, [darkMode]);

  // Toggle function to switch between dark and light modes
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
