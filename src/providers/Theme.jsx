import { createContext, useLayoutEffect, useState } from "react";
import { lsKeys } from "../utils/constants";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const isDarkTheme = (e) => window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem(lsKeys.theme)) || (isDarkTheme ? "dark" : "light"));

  useLayoutEffect(() => {
    const mqListener = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addEventListener("change", mqListener);
    return () => darkThemeMq.removeEventListener("change", mqListener);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const switchTheme = (newTheme) => {
    if (newTheme !== "light" && newTheme !== "dark") return;
    localStorage.setItem(lsKeys.theme, JSON.stringify(newTheme));
    setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      switchTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}