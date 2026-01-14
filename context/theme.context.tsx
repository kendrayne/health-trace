'use client';

import React, { createContext, useState, useEffect, ReactNode, useMemo } from "react";

interface ThemeContextType {
  darkModeEnabled: boolean;
  setDarkModeEnabled: (enabled: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  darkModeEnabled: false,
  setDarkModeEnabled: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPreference = localStorage.getItem("darkModeEnabled");
      if (savedPreference) {
        setDarkModeEnabled(savedPreference === "true"); 
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("darkModeEnabled", JSON.stringify(darkModeEnabled));

    if (darkModeEnabled) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkModeEnabled]);


  const value = {
    darkModeEnabled,
    setDarkModeEnabled
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};